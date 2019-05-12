module ServicesHelper
  include Common
  def total_services(services)
    services.count
  end

  # 追加されたサブスクリプションかどうか
  def already_added?(service)
    subscriptions.where(service_id: service.id).present?
  end

  def categories
    Category.all
  end

  # 気になるサービスをクリップしているかどうか
  def already_clipped?(service)
    current_user.clips.exists?(service_id: service.id)
  end

  def clip(service)
    current_user.clips.find_by(service_id: service.id)
  end
end
