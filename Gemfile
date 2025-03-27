source "https://rubygems.org"

# Ruby version is now managed by mise (.mise.toml)
# See Ruby version: mise which ruby

# GitHub Pages compatibility
gem 'github-pages', '228', group: :jekyll_plugins

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Required dependencies
gem "webrick"  # Needed for Ruby 3+
gem "beautiful-jekyll-theme"
gem 'csv'

# Platform-specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1.1"  # Windows directory monitoring
  gem "http_parser.rb", "~> 0.6.0"  # JRuby compatibility
end
