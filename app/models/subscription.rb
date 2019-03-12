class Subscription < ApplicationRecord
  enum status: { open: 0, secret: 9, development: 5 }
end
