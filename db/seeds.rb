Category.create([
  {name: '音楽'},
  {name: '映画'},
  {name: '動画'},
  {name: 'ファッション'},
  {name: '生活'},
  {name: '本'},
  {name: 'ゲーム'},
  {name: '学習'},
  {name: 'ツール'},
  {name: 'クラウド'},
  {name: '飲食'}
])
20.times do |i|
  Subscription.create(
    name: "サブスクリプション-#{i}",
    summary: "サマリー-#{i}"
  )
end
1.times do |i|
  User.create(
    name: "test",
    email: "test@test.com",
    admin: true,
    password: ENV['TEST_PASSWORD'],
    password_confirmation: ENV['TEST_PASSWORD']
  )
end

1.times do |i|
  User.create(
    name: "daiki",
    email: ENV['GMAIL'],
    admin: true,
    password: ENV['TEST_PASSWORD'],
    password_confirmation:  ENV['TEST_PASSWORD']
  )
end

# 50.times do |i|
#   User.create(
#     name: "user-#{i}",
#     email: "user-#{i}@user.com",
#     password:  "000000",
#     password_confirmation:  "000000"
#   )
# end
