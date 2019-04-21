# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'coffee-rails', '~> 4.2'
gem 'jbuilder', '~> 2.5'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.2'
gem 'sass-rails', '~> 5.0'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'

# ユーザー管理機能
gem 'cancancan'
gem 'devise'
gem 'omniauth'
gem 'omniauth-google-oauth2'
gem 'rails_admin', '~> 1.3'

# 画像アップロード
gem 'aws-sdk-s3'
gem 'carrierwave'
gem 'fog-aws'
gem 'mini_magick', '~> 4.8'

# フロントエンド関連
gem 'bootstrap'
gem 'kaminari'
gem 'font-awesome-sass', '~> 5.8.1'
gem 'jquery-rails'
gem 'jquery-ui-rails'

# ツール系
gem 'dotenv-rails'
gem 'enum_help'
gem 'order_as_specified'
gem 'rails_autolink'
gem 'high_voltage'

# AWS関連
gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
gem 'ed25519', '>= 1.2', '< 2.0'
gem 'mini_racer', platforms: :ruby
gem 'unicorn'

# 通知機能
gem 'whenever', require: false

group :development, :test do
  # デバッグ関連
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'pry-rails'
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
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rb-readline'
  gem 'rubocop', require: false
  gem 'web-console', '>= 3.3.0'
end

group :test do
  # Rspecに必要なgem
  gem 'capybara', '>= 2.15'
  gem 'chromedriver-helper'
  gem 'database_cleaner'
  gem 'database_rewinder'
  gem 'factory_bot_rails'
  gem 'launchy'
  gem 'rspec-rails'
  gem 'selenium-webdriver'
  gem 'spring-commands-rspec'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
