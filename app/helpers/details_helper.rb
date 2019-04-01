module DetailsHelper
  # 詳細登録画面に紐づいているサブスクリプション名を表示
  def subsc_name(detail)
    Subscription.find_by(id: detail.subscription_id).name
  end
end
