lock '3.6.0'

set :application, 'subsc_app'

set :repo_url, 'https://github.com/daiki510/Subsc_app'

set :branch, ENV['BRANCH'] || 'master'

# deploy先ディレクトリ
set :deploy_to, '/var/www/subsc_app'

# シンボリックリンクを貼るフォルダ・ファイル
set :linked_files, %w{.env config/secrets.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/uploads}

# 保持するバージョンの個数
set :keep_releases, 5

# Rubyのバージョン
set :rbenv_ruby, '2.5.3'
set :rbenv_type, :system

#出力するログのレベル
set :log_level, :info

#whenever用の設定
set :whenever_command, "bundle exec whenever"

namespace :deploy do
  desc 'Restart application'
  task :restart do
    invoke 'unicorn:restart'
  end

  desc 'Create database'
  task :db_create do
    on roles(:db) do |host|
      with rails_env: fetch(:rails_env) do
        within current_path do
          execute :bundle, :exec, :rake, 'db:create'
        end
      end
    end
  end

  desc 'Run seed'
  task :seed do
    on roles(:app) do
      with rails_env: fetch(:rails_env) do
        within current_path do
          execute :bundle, :exec, :rake, 'db:seed'
        end
      end
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
    end
  end
end