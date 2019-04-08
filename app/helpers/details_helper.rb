module DetailsHelper
  # 詳細登録画面に紐づいているサブスクリプション名を表示
  def subsc_name(detail)
    Subscription.find_by(id: detail.subscription_id).name
  end

  # 登録したサブスクリプションの合計件数を算出
  def subsc_count(subscriptions)
    subscriptions.map {|subscription| Detail.find_by(subscription_id: subscription.id)}.count
  end
end
