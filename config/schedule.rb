require File.expand_path(File.dirname(__FILE__) + "/environment")
# set :output, 'log/cron.log'
set :output, { :error => 'log/whenever.log', :standard => 'log/cron.log' }

# set :environment, :development
# every 1.day, at: ['9:00 am', '12:40 pm'] do
#   rake "notifying:one_in_a_month"
# end

# every 1.day, at: ['9:00 am', '12:42 pm'] do
#   rake "notifying:two_in_a_month"
# end

# set :environment, :production
# every 1.day, at: ['9:00 am', '12:40 pm'] do
#   rake "notifying:one_in_a_month"
# end

# every 1.day, at: ['9:00 am', '12:42 pm'] do
#   rake "notifying:two_in_a_month"
# end

# every 1.minute do
#   rake "notifying:two_in_a_month"
# end
