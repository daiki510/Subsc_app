FactoryBot.define do
  factory :contact do
    title { 'test' }
    email { 'test@example.com' }
    message { 'this is test' }
    user
  end
end
