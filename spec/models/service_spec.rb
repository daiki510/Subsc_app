require 'rails_helper'

RSpec.describe Service, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @service = FactoryBot.create(:service, user: @user)
  end
  context 'factory_botの検証' do
    it 'factory_botが有効かどうか' do
      service = @service
      expect(service).to be_valid
    end
  end

  it '名前と概要があれば有効な状態であること' do
    service = @service
    expect(service).to be_valid
  end
  it '名前がなければ無効な状態であること' do
    service = FactoryBot.build(:service, name: nil, user: @user)
    service.valid?
    expect(service.errors[:name]).to include('を入力してください')
  end
  it '重複した名前なら無効な状態であること' do
    service = FactoryBot.build(:service, name: 'test_name', user: @user)
    service.valid?
    expect(service.errors[:name]).to include('はすでに存在します')
  end
  it '名前が31文字以上なら無効な状態であること' do
    service = FactoryBot.build(:service, name: 'test' * 10, user: @user)
    service.valid?
    expect(service.errors[:name]).to include('は30文字以内で入力してください')
  end
  it '概要が256文字以上なら無効な状態であること' do
    service = FactoryBot.build(:service, name: 'test', summary: 'test' * 100, user: @user)
    service.valid?
    expect(service.errors[:summary]).to include('は255文字以内で入力してください')
  end
  it 'URLの書式が有効な状態であること' do
    service = FactoryBot.create(:service, name: 'test', link: 'https://www.amazon.co.jp/', user: @user)
    expect(service).to be_valid
  end
  it 'URLの書式が無効な状態であること' do
    service = FactoryBot.build(:service, name: 'test', link: 'amazon', user: @user)
    service.valid?
    expect(service.errors[:link]).to include('は不正な値です')
  end
end
