namespace :notifying do
  desc '利用料金をユーザーへ通知する'
  task notification: :environment do
    users = User.all

    users.each do |user|
      NotificationMailer.notification(user).deliver
    end
  end
end