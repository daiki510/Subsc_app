class Subscription < ApplicationRecord
  #バリデーション
  validates :name, presence: true, uniqueness: true, length: {maximum: 30}
  validates :icon, length: {maximum: 255}
  validates :summary, presence: true, length: {maximum: 255}
  
  #enumの定義
  enum status: { open: 0, secret: 9, development: 5 }

  #アソシエーション
  has_many :additions, dependent: :destroy
  has_many :added_users, through: :additions, source: :user

  has_many :details, dependent: :destroy
  has_many :detailed_users, through: :details, source: :user

  has_many :category_subscs, dependent: :destroy
  has_many :categories, through: :category_subscs, source: :category
end
