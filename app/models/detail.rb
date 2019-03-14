class Detail < ApplicationRecord
  belongs_to :user
  belongs_to :subscription

  # def check_detail?(subscription)
  #   self.find_by(user_id: current_user.id, subscription_id: subsription.id)
  # end
end
