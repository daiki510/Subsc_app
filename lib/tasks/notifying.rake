namespace :notifying do
  desc '毎月１回利用料金をユーザーへ通知する'
  task one_in_a_month: :environment do
    users = User.where(notification_status: 'notifications_one')
    users.each do |user|
      NotificationMailer.notification(user).deliver
    end
  end
  desc '毎月２回利用料金をユーザーへ通知する'
  task two_in_a_month: :environment do
    users = User.where(notification_status: 'notifications_two')
    users.each do |user|
      NotificationMailer.notification(user).deliver
    end
  end
end
