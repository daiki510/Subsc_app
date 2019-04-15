FactoryBot.define do
  factory :subscription1, class: Subscription do
    charge { '1000' }
    due_date { '1日' }
    note { 'this is test note' }
    association :user, factroy: :user1
    association :service, factroy: :service1
  end

  factory :subscription2, class: Subscription do
    charge { '2000' }
    due_date { '10日' }
    note { 'this is test note' }
    association :user, factroy: :user2
    association :service, factroy: :service1
  end
end
