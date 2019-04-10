module UsersHelper
  def subscription(user, service)
    Subscription.find_by(user_id: user.id, service_id: service.id)
  end

  def total_subscription_count(user)
    user.subscriptions.count
  end
end
