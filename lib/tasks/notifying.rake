namespace :notifying do
  desc '利用料金をユーザーへ通知する'
  task notification: :environment do
    user = User.find_by(name: "test")

    # users.each do |user|
      NotificationMailer.notification(user).deliver
    # end
  end
end
