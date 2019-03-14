module UsersHelper
  def total_charge
    @user.details.map { |detail| detail.charge}.sum
  end
end
