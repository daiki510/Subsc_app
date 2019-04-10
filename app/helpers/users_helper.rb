module UsersHelper
  def subscription(service)
    Subscription.find_by(service_id: service.id)
  end

  def total_subscription_count(user)
    user.subscriptions.count
  end
end
