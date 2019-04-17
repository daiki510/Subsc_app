FactoryBot.define do
  factory :service do
    name { 'test_name' }
    summary { 'test_summary' }
    user

    # after(:create) do |service|
    #   create(:category, services: [service])
    # end
  end
end
