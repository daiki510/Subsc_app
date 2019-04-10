module SubscriptionsHelper
  def service(subscription)
    Service.find_by(id: subscription.service_id)
  end

  def total_charge(user)
    Subscription.where(user_id: user.id).sum(:charge)
  end

  def get_subscription_id(service)
    Subscription.find_by(service_id: service.id).id
  end
end
