class Detail < ApplicationRecord
  #バリデーション
  validates :charge, presence: true, length: {maximum: 10}, numericality: { greater_than: 1000000 }
  validates :due_date, presence: true, length: {maximum: 10}
  validates :payment_type, length: {maximum: 20}
  validates :note, length: {maximum: 255}

  #アソシエーション
  belongs_to :user
  belongs_to :subscription
end
