module UsersHelper
  def total_charge(user)
    user.details.map(&:charge).sum
  end
end
