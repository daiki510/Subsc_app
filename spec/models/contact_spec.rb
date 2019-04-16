require 'rails_helper'

RSpec.describe Contact, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @contact = FactoryBot.create(:contact, user: @user)
  end
  context 'factory_botの検証' do
    it 'factory_botが有効かどうか' do
      contact = @contact
      expect(contact).to be_valid
    end
  end

  it 'タイトル、メールアドレス、内容があれば有効な状態であること' do
    contact = @contact
    expect(contact).to be_valid
  end
  it 'タイトルがなければ無効な状態であること' do
    contact = FactoryBot.build(:contact, title: nil, user: @user)
    contact.valid?
    expect(contact.errors[:title]).to include('を入力してください')
  end
  it 'タイトルが31文字以上なら無効な状態であること' do
    contact = FactoryBot.build(:contact, title: 'test' * 20, user: @user)
    contact.valid?
    expect(contact.errors[:title]).to include('は50文字以内で入力してください')
  end
  it '内容が501文字以上なら無効な状態であること' do
    contact = FactoryBot.build(:contact, message: 'test' * 200, user: @user)
    contact.valid?
    expect(contact.errors[:message]).to include('は500文字以内で入力してください')
  end
  it 'メールアドレスの書式が無効な状態であること' do
    contact = FactoryBot.build(:contact, email: 'test', user: @user)
    contact.valid?
    expect(contact.errors[:email]).to include('は不正な値です')
  end
end
