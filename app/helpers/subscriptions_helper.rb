module SubscriptionsHelper
  # 詳細登録画面に紐づいているサブスクリプション名を表示
  def subsc_name(subscription)
    Subscription.find_by(id: subscription.service_id).name
  end

  # 登録したサブスクリプションの合計件数を算出
  def subsc_count(subscriptions)
    subscriptions.map { |subscription| Subscription.find_by(service_id: subscription.id) }.count
  end
end
