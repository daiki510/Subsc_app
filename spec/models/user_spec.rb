require 'rails_helper'

RSpec.describe User, type: :model do
  # 名前、メールアドレス、パスワードがあれば有効な状態であること
  it "is valid with a name, email, password" do
    user = User.new(
      name: "test_name",
      email: "test@example.com",
      password: "000000",
      password_confirmation: "000000"
    )
    expect(user).to be_valid
  end
  # 名前がなければ無効な状態であること
  it "is invalid without a name" do
    user = User.new(name: nil)
    user.valid?
    expect(user.errors[:name]).to include("を入力してください")
  end
  # 重複したメールアドレスなら無効な状態であること
  it "is invalid with a duplicate email" do
    User.create(
      name: "test_name1",
      email: "test@example.com",
      password: "000000",
      password_confirmation: "000000"
    )
    user = User.new(
      name: "test_name2",
      email: "test@example.com",
      password: "000000",
      password_confirmation: "000000"
    )
    user.valid?
    expect(user.errors[:email]).to include("はすでに存在します")
  end
  # 名前が31文字以上なら無効な状態であること
  it "is invalid with name which has 31 or more characters" do
    user = User.new(
      name: "test"*10,
      email: "test@example.com",
      password: "000000",
      password_confirmation: "000000"
    )
    user.valid?
    expect(user.errors[:name]).to include("は30文字以内で入力してください")
  end
  # パスワードが5文字以下なら無効な状態であること
  it "is invalid with password which has 5 or less characters" do
    user = User.new(
      name: "test",
      email: "test@example.com",
      password: "0000",
      password_confirmation: "0000"
    )
    user.valid?
    expect(user.errors[:password]).to include("は6文字以上で入力してください")
  end
  # パスワードと確認パスワードが一致しなければ無効な状態であること
  it "is invalid password and password_confimation do not match" do
    user = User.new(
      name: "test",
      email: "test@example.com",
      password: "000000",
      password_confirmation: "111111"
    )
    expect(user).not_to be_valid
  end
  # メールアドレスの書式が無効な状態であること
  it "is valid with email which is collect format" do
    user = User.new(
      name: "test_name",
      email: "test_email",
      password: "000000",
      password_confirmation: "000000"
    )
    user.valid?
    expect(user.errors[:email]).to include("は不正な値です")
  end
end
