require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = FactoryBot.create(:user)
  end
  context 'factory_botの検証' do
    it 'factory_botが有効かどうか' do
      user = @user
      expect(user).to be_valid
    end
  end

  it '名前、メールアドレス、パスワードがあれば有効な状態であること' do
    user = @user
    expect(user).to be_valid
  end
  it '名前がなければ無効な状態であること' do
    user = FactoryBot.build(:user, name: nil)
    user.valid?
    expect(user.errors[:name]).to include('を入力してください')
  end
  it '重複したメールアドレスなら無効な状態であること' do
    user = FactoryBot.build(:user, email: 'testuser@example.com')
    user.valid?
    expect(user.errors[:email]).to include('はすでに存在します')
  end
  it '名前が31文字以上なら無効な状態であること' do
    user = FactoryBot.build(:user, name: 'user' * 10)
    user.valid?
    expect(user.errors[:name]).to include('は30文字以内で入力してください')
  end
  it 'パスワードが5文字以下なら無効な状態であること' do
    user = FactoryBot.build(:user, password: '0000')
    user.valid?
    expect(user.errors[:password]).to include('は6文字以上で入力してください')
  end
  it 'メールアドレスの書式が無効な状態であること' do
    user = FactoryBot.build(:user, email: 'test_user')
    user.valid?
    expect(user.errors[:email]).to include('は不正な値です')
  end
end
