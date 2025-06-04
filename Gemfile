source "https://rubygems.org"

# This setup uses the latest stable versions

# GitHub Pages compatibility - using the latest version
gem 'github-pages', group: :jekyll_plugins

# Jekyll plugins - latest versions
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Required dependencies - latest versions
gem "webrick"  # Needed for Ruby 3+
gem "beautiful-jekyll-theme"
gem 'csv'

# Platform-specific gems - latest versions
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo"
  gem "tzinfo-data"
  gem "wdm"  # Windows directory monitoring
  gem "http_parser.rb"  # JRuby compatibility
end
