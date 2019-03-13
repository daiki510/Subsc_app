class Subscription < ApplicationRecord
  enum status: { open: 0, secret: 9, development: 5 }

  has_many :additions, dependent: :destroy
  has_many :added_users, through: :additions, source: :user

  has_many :details, dependent: :destroy
  has_many :detailed_users, through: :details, source: :user
end
