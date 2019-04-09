FactoryBot.define do
  factory :user1, class: User do
    name { 'test_user1' }
    email { 'user1@example.com' }
    password { '000000' }
    provider { 'google' }
    uid { '110033013805621465000' }
  end
  factory :user2, class: User do
    name { 'test_user2' }
    email { 'user2@example.com' }
    password { '000000' }
    provider { 'google' }
    uid { '110033013805621465011' }
  end
  factory :admin_user, class: User do
    name { 'admin' }
    email { 'admin@example.com' }
    password { '000000' }
    admin { 'true' }
    provider { 'google' }
    uid { '110033013805621465022' }
  end
end
