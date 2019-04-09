FactoryBot.define do
  factory :service1, class: Service do
    name { 'test_name1' }
    summary { 'test_summary1' }
  end
  factory :service2, class: Service do
    name { 'test_name2' }
    summary { 'test_summary2' }
  end
end
