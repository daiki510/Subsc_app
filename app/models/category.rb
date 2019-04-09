class Category < ApplicationRecord
  # バリデーション
  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }

  # アソシエーション
  has_many :categorizings, dependent: :destroy
  has_many :services, through: :categorizings, source: :service
end
