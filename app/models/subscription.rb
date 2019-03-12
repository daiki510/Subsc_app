class Subscription < ApplicationRecord
  enum status: { public: 0, private: 9, development: 5 }
end
