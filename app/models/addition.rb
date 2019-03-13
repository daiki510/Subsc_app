class Addition < ApplicationRecord
  belongs_to :user
  belongs_to :subscription
  validates_uniqueness_of :subscription_id, scope: :user_id
end
