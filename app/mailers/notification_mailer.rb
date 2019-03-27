class NotificationMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notification_mailer.notification.subject
  #
  def notification(user)
    @user = user

    mail to: "#{@user.email}", subject: "Hello, #{@user.name}"
  end
end
