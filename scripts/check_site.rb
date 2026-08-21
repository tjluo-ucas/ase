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

css = (ROOT / "static/css/course.css").read
errors << "course.css: unbalanced braces" unless css.count("{") == css.count("}")
errors << "head: legacy remote stylesheet remains" if (ROOT / "_includes/head.html").read.include?("tjluo-ucas.github.io/ns")

if errors.empty?
  puts "site checks: PASS"
  puts "bilingual core routes: #{pages.length}"
  puts "translation pairs: #{pages.length / 2}"
  exit 0
end

warn errors.join("\n")
exit 1
