require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user1 = FactoryBot.create(:user1)
    @user2 = FactoryBot.create(:user2)
  end
  context "check factorybot of validation" do
    # factory_botが有効かどうかを検査。
    it "has a valid factory of user1" do
      user = @user1
      expect(user).to be_valid
    end
    it "has a valid factory of user2" do
      user = @user2
      expect(user).to be_valid
    end
  end

  # 名前、メールアドレス、パスワードがあれば有効な状態であること
  it "is valid with a name, email, password" do
    user = @user1
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
    user1 = @user1
    user2 = FactoryBot.build(:user2, email: "user1@example.com")
    user2.valid?
    expect(user2.errors[:email]).to include("はすでに存在します")
  end
  # 名前が31文字以上なら無効な状態であること
  it "is invalid with name which has 31 or more characters" do
    user = FactoryBot.build(:user1, name: "user1"*10)
    user.valid?
    expect(user.errors[:name]).to include("は30文字以内で入力してください")
  end
  # パスワードが5文字以下なら無効な状態であること
  it "is invalid with password which has 5 or less characters" do
    user = FactoryBot.build(:user1, password: "0000")
    user.valid?
    expect(user.errors[:password]).to include("は6文字以上で入力してください")
  end
  # メールアドレスの書式が無効な状態であること
  it "is valid with email which is collect format" do
    user = FactoryBot.build(:user1, email: "test_user1")
    user.valid?
    expect(user.errors[:email]).to include("は不正な値です")
  end
end
