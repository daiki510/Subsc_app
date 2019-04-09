class Category < ApplicationRecord
  # バリデーション
  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }

  # アソシエーション
  has_many :category_subscs, dependent: :destroy
  has_many :subscriptions, through: :category_subscs, source: :subscription
end
