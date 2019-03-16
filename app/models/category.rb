class Category < ApplicationRecord
  has_many :category_subscs, dependent: :destroy
  has_many :subscriptions, through: :category_subscs, source: :subscription
end