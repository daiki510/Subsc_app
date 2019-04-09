class NotificationMailer < ApplicationMailer
  def notification(user)
    @user = user

    mail to: @user.email.to_s, subject: "Hello, #{@user.name}"
  end
end
