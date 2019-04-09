module UsersHelper
  def total_charge(user)
    user.details.map(&:charge).sum
  end

  def detail(subscription)
    current_user.details.find_by(subscription_id: subscription.id)
  end
end
