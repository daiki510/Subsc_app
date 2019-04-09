require 'rails_helper'

RSpec.describe Contact, type: :model do
  before do
    @user = FactoryBot.create(:user1)
    @contact = FactoryBot.create(:contact, user: @user)
  end
  # factory_botが有効かどうかを検査。
  context 'check factorybot of validation' do
    it 'has a valid factory of contact' do
      contact = @contact
      expect(contact).to be_valid
    end
  end

  # タイトル、メールアドレス、内容があれば有効な状態であること
  it 'is valid with a title,email,message' do
    contact = @contact
    expect(contact).to be_valid
  end
  # タイトルがなければ無効な状態であること
  it 'is invalid without a title' do
    contact = FactoryBot.build(:contact, title: nil, user: @user)
    contact.valid?
    expect(contact.errors[:title]).to include('を入力してください')
  end
  # タイトルが31文字以上なら無効な状態であること
  it 'is invalid with title which has 51 or more characters' do
    contact = FactoryBot.build(:contact, title: 'test' * 20, user: @user)
    contact.valid?
    expect(contact.errors[:title]).to include('は50文字以内で入力してください')
  end
  # 内容が501文字以上なら無効な状態であること
  it 'is invalid with message which has 501 or more characters' do
    contact = FactoryBot.build(:contact, message: 'test' * 200, user: @user)
    contact.valid?
    expect(contact.errors[:message]).to include('は500文字以内で入力してください')
  end
  # メールアドレスの書式が無効な状態であること
  it 'is invalid with email which is incollect format' do
    contact = FactoryBot.build(:contact, email: 'test', user: @user)
    contact.valid?
    expect(contact.errors[:email]).to include('は不正な値です')
  end
end
