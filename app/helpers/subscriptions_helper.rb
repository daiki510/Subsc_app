module SubscriptionsHelper
  def service(subscription)
    Service.find_by(id: subscription.service_id)
  end

  # 登録したサブスクリプションの合計件数を算出
  def total_subscriptions(services)
    services.count
  end

  def total_charge(user)
    Subscription.where(user_id: user.id).sum(:charge)
  end
end
