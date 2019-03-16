class CategorySubsc < ApplicationRecord
  belongs_to :category
  belongs_to :subscription
end
