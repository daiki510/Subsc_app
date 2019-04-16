class Category < ApplicationRecord
  validates :name, presence: true, uniqueness: true, length: { maximum: 15 }

  has_many :categorizings, dependent: :destroy
  has_many :services, through: :categorizings, source: :service
end
