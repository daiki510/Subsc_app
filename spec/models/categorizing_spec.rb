require 'rails_helper'

RSpec.describe Categorizing, type: :model do
  before do
    @service = FactoryBot.create(:service)
    @category1 = FactoryBot.create(:category, name: 'test1')
    @category2 = FactoryBot.create(:category, name: 'test2')
    @categorizing = FactoryBot.create(:categorizing, service: @service, category: @category1)
  end
  context 'factory_botの検証' do
    it 'factory_botが有効かどうか' do
      categorizing = @categorizing
      expect(categorizing).to be_valid
    end
  end
  it 'service_idとcategory_idがあれば有効な状態であること' do
    categorizing = @categorizing
    expect(categorizing).to be_valid
  end
  it 'サービスがなければ無効な状態であること' do
    categorizing = FactoryBot.build(:categorizing, category: @category1, service: nil)
    categorizing.valid?
    expect(categorizing.errors[:service]).to include('を入力してください')
  end
  it 'カテゴリーがなければ無効な状態であること' do
    categorizing = FactoryBot.build(:categorizing, category: nil, service: @service)
    categorizing.valid?
    expect(categorizing.errors[:category]).to include('を入力してください')
  end
  it '一つのサービスに複数のカテゴリーを登録できること' do
    categorizing1 = @categorizing
    categorizing2 = FactoryBot.build(:categorizing, category: @category2, service: @service)
    expect(categorizing1).to be_valid
    expect(categorizing2).to be_valid
  end
end
