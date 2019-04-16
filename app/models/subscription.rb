class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :service

  validates :charge, presence: true, length: { maximum: 10 }, numericality: { greater_than_or_equal_to: 0, less_than: 1_000_00 }
  validates :due_date, presence: true, length: { maximum: 10 }
  validates :note, length: { maximum: 255 }
  validates :service_id, uniqueness: { scope: :user_id }
end
