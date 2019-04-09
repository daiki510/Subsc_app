class Subscription < ApplicationRecord
  # バリデーション
  validates :charge, presence: true, length: { maximum: 10 }, numericality: { less_than: 1_000_000 }
  validates :due_date, presence: true, length: { maximum: 10 }
  validates :payment_type, length: { maximum: 20 }
  validates :note, length: { maximum: 255 }

  # アソシエーション
  belongs_to :user
  belongs_to :service

  validates :service_id, uniqueness: { scope: :user_id }
end
