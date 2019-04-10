module SubscriptionsHelper
  # 詳細登録画面に紐づいているサブスクリプション名を表示
  # def service_name(subscription)
  #   Service.find_by(id: subscription.service_id).name
  # end

  # 登録したサブスクリプションの合計件数を算出
  def total_subscriptions(services)
    services.count
  end

  def total_charge(user)
    Subscription.where(user_id: user.id).sum(:charge)
  end
end
