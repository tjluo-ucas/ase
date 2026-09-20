#!/usr/bin/env ruby

require "pathname"
require "yaml"
require "date"

ROOT = Pathname.new(__dir__).parent.freeze
errors = []

def front_matter(path)
  source = path.read
  return [{}, source] unless source.start_with?("---\n")
  _, yaml, body = source.split("---\n", 3)
  [YAML.safe_load(yaml, permitted_classes: [Date, Time], aliases: true) || {}, body]
end

config = YAML.safe_load((ROOT / "_config.yml").read, aliases: true)
errors << "baseurl must be /ase" unless config["baseurl"] == "/ase"
errors << "unexpected site URL" unless config["url"] == "https://tjluo-ucas.github.io"

pages = {
  "/" => "index.md",
  "/2019/02/08/intro/" => "_posts/2019-02-08-intro.md",
  "/slides/" => "_posts/2019-02-10-slides.md",
  "/schedule/" => "_posts/2019-02-09-schedule.md",
  "/books/" => "_posts/2019-02-10-books.md",
  "/assignments/" => "_posts/2019-02-10-assignments.md",
  "/en/" => "en/index.md",
  "/en/syllabus/" => "en/syllabus.md",
  "/en/lectures/" => "en/lectures.md",
  "/en/schedule/" => "en/schedule.md",
  "/en/references/" => "en/references.md",
  "/en/assignments/" => "en/assignments.md"
}.freeze

pages.each do |route, name|
  path = ROOT / name
  unless path.file?
    errors << "missing page: #{name}"
    next
  end
  data, body = front_matter(path)
  %w[layout title lang translation_url].each do |key|
    errors << "#{name}: missing #{key}" if data[key].to_s.empty?
  end
  errors << "#{name}: empty course content" if body.lines.length < 20
  translation = data["translation_url"]
  errors << "#{name}: unknown translation route #{translation}" unless pages.key?(translation)
  expected_lang = route.start_with?("/en") ? "en" : "zh-CN"
  errors << "#{name}: lang must be #{expected_lang}" unless data["lang"] == expected_lang
end

pages.each do |route, name|
  data, = front_matter(ROOT / name)
  translated_name = pages[data["translation_url"]]
  next unless translated_name
  reverse, = front_matter(ROOT / translated_name)
  errors << "#{name}: translation is not reciprocal" unless reverse["translation_url"] == route
end

source_files = Dir[ROOT.join("{_includes,_layouts,en,_posts}", "**", "*.{md,html}").to_s]
  .map { |path| Pathname.new(path) } + [ROOT / "index.md"]
source_files.each do |path|
  text = path.read
  relative = path.relative_path_from(ROOT)
  errors << "#{relative}: unmatched Liquid output" unless text.scan("{{").length == text.scan("}}").length
  errors << "#{relative}: unmatched Liquid tag" unless text.scan("{%").length == text.scan("%}").length
end

header = (ROOT / "_includes/header.html").read
pages.each_key do |route|
  errors << "header: route not represented #{route}" unless route == "/2019/02/08/intro/" ? header.include?("/2019/02/08/intro/") : header.include?("'#{route}'")
end

%w[en/assignments.md _posts/2019-02-10-assignments.md].each do |name|
  text = (ROOT / name).read
  ids = text.scan(/ISE-A[1-9]\b/).uniq.sort
  expected = (1..6).map { |number| "ISE-A#{number}" }
  errors << "#{name}: expected exactly ISE-A1..ISE-A6, found #{ids.join(', ')}" unless ids == expected
end

{
  "en/schedule.md" => ["14 September", "21 December", "21 Sep 2026", "7 Dec 2026"],
  "_posts/2019-02-09-schedule.md" => ["2026 年 9 月 14 日", "12 月 21 日", "2026-09-21", "2026-12-07"]
}.each do |name, required|
  text = (ROOT / name).read
  required.each do |value|
    errors << "#{name}: missing authoritative Fall 2026 date #{value}" unless text.include?(value)
  end
  errors << "#{name}: must state 15 weeks" unless text.match?(/(?:15\s*周|15-week|15 weeks)/i)
  errors << "#{name}: must state the seven-day task window" unless text.match?(/(?:七天|seven days)/i)
end

core_policy_files = %w[en/syllabus.md en/schedule.md en/assignments.md _posts/2019-02-08-intro.md _posts/2019-02-09-schedule.md _posts/2019-02-10-assignments.md]
stale_policy = /five individual assignments|five assignments|5次个人|五次个人|五次作业|A1[—-]A5|ISE-A(?:7|8|9)\b/i
core_policy_files.each do |name|
  errors << "#{name}: contains a superseded assignment or assessment policy" if (ROOT / name).read.match?(stale_policy)
end

%w[en/syllabus.md en/assignments.md _posts/2019-02-08-intro.md _posts/2019-02-10-assignments.md].each do |name|
  text = (ROOT / name).read
  errors << "#{name}: missing unified 30/10/40/20 assessment" unless ["30%", "10%", "40%", "20%"].all? { |weight| text.include?(weight) }
end

css = (ROOT / "static/css/course.css").read
errors << "course.css: unbalanced braces" unless css.count("{") == css.count("}")
errors << "head: legacy remote stylesheet remains" if (ROOT / "_includes/head.html").read.include?("tjluo-ucas.github.io/ns")

if errors.empty?
  puts "site checks: PASS"
  puts "bilingual core routes: #{pages.length}"
  puts "translation pairs: #{pages.length / 2}"
  puts "assignment IDs per locale: 6"
  puts "Fall 2026 schedule and 30/10/40/20 assessment: PASS"
  exit 0
end

warn errors.join("\n")
exit 1
