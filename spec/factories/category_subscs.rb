FactoryBot.define do
  factory :category_subsc1, class: CategorySubsc do
    association :subscription, factroy: :subscription1
    association :category, factroy: :category1
  end
  factory :category_subsc2, class: CategorySubsc do
    association :subscription, factroy: :subscription1
    association :category, factroy: :category2
  end
end
