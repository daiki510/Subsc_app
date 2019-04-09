module ServicesHelper
  def total_subsc(services)
    services.count
  end

  # 追加されたサブスクリプションかどうか
  def already_added?(service)
    current_user.subscriptions.where(service_id: service.id).present?
  end
end
