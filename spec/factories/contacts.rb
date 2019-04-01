FactoryBot.define do
  factory :contact do
    title {"test"}
    email {"test@example.com"}
    message {"this is test"}
    association :user, factory: :user1
  end
end
