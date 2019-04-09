source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

gem 'rails', '~> 5.2.2'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.1.0', require: false

#ログイン機能
gem 'devise'
gem 'rails_admin', '~> 1.3'
gem 'cancancan'
gem 'omniauth'
gem 'omniauth-google-oauth2'

#画像アップロード用
gem 'carrierwave'
gem 'mini_magick', '~> 4.8'
gem 'fog-aws'
gem 'aws-sdk-s3'

#ページネーション
gem 'kaminari'

#フロントエンド関連
gem 'bootstrap'
gem 'jquery-rails' 
gem 'jquery-ui-rails'
gem 'font-awesome-sass', '~> 5.8.1'

#ツール系
gem 'rails_autolink'
gem 'order_as_specified'
gem 'dotenv-rails'
gem 'enum_help'

#AWS関連
gem 'unicorn'
gem 'mini_racer', platforms: :ruby
gem 'ed25519' ,'>= 1.2', '< 2.0'
gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'

#通知機能
gem 'whenever', require: false

group :development, :test do
  # デバッグ関連
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-rails'
  gem 'better_errors'
  gem 'binding_of_caller'
  # capistrano一式
  gem 'capistrano', '3.6.0'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano-rbenv'
  gem 'capistrano3-unicorn'

  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rb-readline'
  gem 'rubocop', require: false
end

group :test do
  # Rspecに必要なgem
  gem "rspec-rails"
  gem 'spring-commands-rspec'
  gem "factory_bot_rails"
  gem 'capybara', '>= 2.15'
  gem 'chromedriver-helper'
  gem "database_cleaner"
  gem "launchy"
  gem 'selenium-webdriver'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
