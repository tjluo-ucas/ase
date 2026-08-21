#!/usr/bin/env ruby

require "fileutils"
require "pathname"
require "yaml"
require "date"

ROOT = Pathname.new(__dir__).parent.expand_path.freeze
OUT = (ROOT / "_site").freeze
GEM_ROOT = (ROOT.parent / "ds/vendor/bundle").freeze

%w[liquid kramdown].each do |gem_name|
  lib = Dir[GEM_ROOT.join("ruby/*/gems/#{gem_name}-[0-9]*/lib").to_s].sort.last
  abort "Missing #{gem_name}; use GitHub Pages for the production build" unless lib
  $LOAD_PATH.unshift(lib)
end

require "kramdown"
require "liquid"

CONFIG = YAML.safe_load((ROOT / "_config.yml").read, aliases: true).freeze
ROUTES = {
  "index.md" => "/",
  "_posts/2019-02-08-intro.md" => "/2019/02/08/intro/",
  "_posts/2019-02-09-schedule.md" => "/schedule/",
  "_posts/2019-02-10-assignments.md" => "/assignments/",
  "_posts/2019-02-10-books.md" => "/books/",
  "_posts/2019-02-10-slides.md" => "/slides/",
  "en/index.md" => "/en/",
  "en/syllabus.md" => "/en/syllabus/",
  "en/lectures.md" => "/en/lectures/",
  "en/schedule.md" => "/en/schedule/",
  "en/references.md" => "/en/references/",
  "en/assignments.md" => "/en/assignments/"
}.freeze

module SiteFilters
  def normalize_whitespace(input)
    input.to_s.gsub(/\s+/, " ").strip
  end
end

def parse_front_matter(source)
  return [{}, source] unless source.start_with?("---\n")
  _, yaml, body = source.split("---\n", 3)
  [YAML.safe_load(yaml, permitted_classes: [Date, Time], aliases: true) || {}, body]
end

def expand_includes(source)
  previous = nil
  until source == previous
    previous = source
    source = source.gsub(/{%\s*include\s+([^\s%]+)\s*%}/) do
      path = ROOT / "_includes" / Regexp.last_match(1)
      abort "Missing include #{path}" unless path.file?
      path.read
    end
  end
  source
end

def render(source, page, content = nil)
  assigns = { "site" => CONFIG, "page" => page, "content" => content }
  Liquid::Template.parse(source).render!(assigns, filters: [SiteFilters])
end

def layout_html(name, page, content)
  source = (ROOT / "_layouts" / "#{name}.html").read
  data, body = parse_front_matter(source)
  html = render(expand_includes(body), page, content)
  data["layout"] ? layout_html(data["layout"], page, html) : html
end

abort "Refusing unexpected output path" unless OUT == ROOT / "_site"
FileUtils.rm_rf(OUT)
FileUtils.mkdir_p(OUT)

ROUTES.each do |relative, route|
  data, body = parse_front_matter((ROOT / relative).read)
  data["url"] = route
  markdown = render(body, data)
  content = Kramdown::Document.new(markdown).to_html
  html = layout_html(data.fetch("layout"), data, content)
  destination = route == "/" ? OUT / "index.html" : OUT / route.delete_prefix("/") / "index.html"
  FileUtils.mkdir_p(destination.dirname)
  destination.write(html)
end

FileUtils.cp_r(ROOT / "static", OUT / "static")

errors = []
Dir[OUT.join("**/*.html").to_s].each do |file|
  text = File.read(file)
  errors << "#{file}: unresolved Liquid" if text.include?("{{") || text.include?("{%");
  text.scan(/(?:href|src)="([^"]+)"/).flatten.each do |url|
    next if url.start_with?("http://", "https://", "mailto:", "#")
    next unless url.start_with?(CONFIG.fetch("baseurl"))
    route = url.delete_prefix(CONFIG.fetch("baseurl")).split("#", 2).first
    next if route.start_with?("/static/") || route == "/slides_/"
    target = route == "/" ? OUT / "index.html" : OUT / route.delete_prefix("/") / "index.html"
    errors << "#{file}: broken generated link #{url}" unless target.file?
  end
end

abort errors.join("\n") unless errors.empty?
puts "preview build: PASS"
puts "generated core pages: #{ROUTES.length}"
puts "output: #{OUT}"
