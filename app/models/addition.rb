class Addition < ApplicationRecord
  belongs_to :user
  belongs_to :subscription
  validates :subscription_id, uniqueness: { scope: :user_id }
end
