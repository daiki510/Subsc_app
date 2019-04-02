FactoryBot.define do
  factory :addition1, class: Addition do
    association :user, factroy: :user1
    association :subscription, factroy: :subscription1
  end
  factory :addition2, class: Addition do
    association :user, factroy: :user1
    association :subscription, factroy: :subscription2
  end
end
