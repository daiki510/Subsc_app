FactoryBot.define do
  factory :service do
    name { 'test_name' }
    summary { 'test_summary' }
    user
  end
end
