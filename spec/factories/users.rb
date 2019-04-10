FactoryBot.define do
  factory :user1, class: User do
    name { 'test_user1' }
    email { 'user1@example.com' }
    password { '000000' }
    provider { 'google' }
    uid { SecureRandom.uuid }
  end
  factory :user2, class: User do
    name { 'test_user2' }
    email { 'user2@example.com' }
    password { '000000' }
    provider { 'google' }
    uid { SecureRandom.uuid }
  end
  factory :admin_user, class: User do
    name { 'admin' }
    email { 'admin@example.com' }
    password { '000000' }
    admin { 'true' }
    provider { 'google' }
    uid { SecureRandom.uuid }
  end
end
