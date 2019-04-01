class Contact < ApplicationRecord
  belongs_to :user
  
  validates :title, presence: true, length: {maximum: 50}
  validates :email, presence: true, length: {maximum: 255},
                    format: {with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i}
  validates :message, presence: true, length: {maximum: 500}
end
