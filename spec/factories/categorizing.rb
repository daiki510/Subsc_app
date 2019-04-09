FactoryBot.define do
  factory :categorizing1, class: Categorizing do
    association :service, factroy: :service1
    association :category, factroy: :category1
  end
  factory :categorizing2, class: Categorizing do
    association :service, factroy: :service1
    association :category, factroy: :category2
  end
end
