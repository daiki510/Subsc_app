module UsersHelper
  def total_charge(user)
    user.details.map { |detail| detail.charge}.sum
  end
end
