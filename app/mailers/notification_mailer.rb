class NotificationMailer < ApplicationMailer
  def notification(user)
    @user = user

    mail to: "#{@user.email}", subject: "Hello, #{@user.name}"
  end
end
