module UsersHelper
  def service(subscription)
    Service.find_by(id: subscription.service_id)
  end
end
