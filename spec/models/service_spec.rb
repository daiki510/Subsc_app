require 'rails_helper'

RSpec.describe Service, type: :model do
  before do
    @service1 = FactoryBot.create(:service1)
    @service2 = FactoryBot.create(:service2)
  end
  # factory_botが有効かどうかを検査。
  context 'check factorybot of validation' do
    it 'has a valid factory of service1' do
      service = @service1
      expect(service).to be_valid
    end
    it 'has a valid factory of service2' do
      service = @service2
      expect(service).to be_valid
    end
  end

  # 名前と概要があれば有効な状態であること
  it 'is valid with a name, summary' do
    service = @service1
    expect(service).to be_valid
  end
  # 名前がなければ無効な状態であること
  it 'is invalid without a name' do
    service = FactoryBot.build(:service1, name: nil)
    service.valid?
    expect(service.errors[:name]).to include('を入力してください')
  end
  # 重複した名前なら無効な状態であること
  it 'is invalid with a duplicate name' do
    service = FactoryBot.build(:service2, name: 'test_name1')
    service.valid?
    expect(service.errors[:name]).to include('はすでに存在します')
  end
  # 名前が31文字以上なら無効な状態であること
  it 'is invalid with name which has 31 or more characters' do
    service = FactoryBot.build(:service1, name: 'test' * 10)
    service.valid?
    expect(service.errors[:name]).to include('は30文字以内で入力してください')
  end
  # 概要が256文字以上なら無効な状態であること
  it 'is invalid with summary which has 256 or more characters' do
    service = FactoryBot.build(:service1, summary: 'test' * 100)
    service.valid?
    expect(service.errors[:summary]).to include('は255文字以内で入力してください')
  end
  # URLの書式が有効な状態であること
  it 'is valid with link which is collect format' do
    service = FactoryBot.create(:service1, name: 'test_name3', link: 'https://www.amazon.co.jp/')
    expect(service).to be_valid
  end
  # URLの書式が無効な状態であること
  it 'is invalid with link which is incollect format' do
    service = FactoryBot.build(:service1, name: 'test_name3', link: 'amazon')
    service.valid?
    expect(service.errors[:link]).to include('は不正な値です')
  end
end
