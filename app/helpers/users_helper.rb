module UsersHelper
  def total_charge(user)
    user.services.map(&:charge).sum
  end

  def service(service)
    current_user.services.find_by(service_id: service.id)
  end
end
