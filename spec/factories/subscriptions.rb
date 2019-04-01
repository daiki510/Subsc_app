FactoryBot.define do
  factory :subscription1, class: Subscription do
    name { "test_name1" }
    summary { "test_summary1" }
  end
  factory :subscription2, class: Subscription do
    name { "test_name2" }
    summary { "test_summary2" }
  end
end
