FactoryBot.define do
  factory :detail1, class: Detail do
    charge { "1000" }
    due_date { "1日" }
    payment_type { "クレジットカード" }
    note { "this is test note" }
    association :user, factroy: :user1
    association :subscription, factroy: :subscription1
  end

  factory :detail2, class: Detail do
    charge { "2000" }
    due_date { "10日" }
    payment_type { "クレジットカード" }
    note { "this is test note" }
    association :user, factroy: :user2
    association :subscription, factroy: :subscription1
  end
end
