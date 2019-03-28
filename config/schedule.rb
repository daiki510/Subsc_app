require File.expand_path(File.dirname(__FILE__) + "/environment")
set :output, 'log/cron.log'
set :environment, :developmentbundle exec whenever

# 1分毎に回す
every 1.minute do
  rake "notifying:notification"
end