class Subscription < ApplicationRecord
  enum status: { open: 0, secret: 9, development: 5 }

  has_many :addtions, dependent: :destroy
  has_many :added_users, through: :additions, source: :user
end
