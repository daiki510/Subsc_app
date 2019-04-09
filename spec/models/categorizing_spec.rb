require 'rails_helper'

RSpec.describe CategorySubsc, type: :model do
  before do
    @service = FactoryBot.create(:service1)
    @category1 = FactoryBot.create(:category1)
    @category2 = FactoryBot.create(:category2)
    @categorizing1 = FactoryBot.create(:categorizing1, service: @service, category: @category1)
    @categorizing2 = FactoryBot.create(:categorizing2, service: @service, category: @category2)
  end
  context 'If it is valid' do
    # service_idとcategory_idがあれば有効な状態であること
    it 'is valid with category_id, service_id' do
      categorizing = @categorizing1
      expect(categorizing).to be_valid
    end
    # 一つのサブスクリプションに複数のカテゴリーを登録できること。
    it 'is valid a service can have two or more categories' do
      categorizing1 = @categorizing1
      categorizing2 = @categorizing2
      expect(categorizing1).to be_valid
      expect(categorizing2).to be_valid
    end
  end
  context 'If it is invalid' do
    # サブスクリプションがなければ無効な状態であること
    it 'is invalid without a service_id' do
      categorizing = FactoryBot.build(:categorizing1, category: @category1, service: nil)
      categorizing.valid?
      expect(categorizing.errors[:service]).to include('を入力してください')
    end
    # カテゴリーがなければ無効な状態であること
    it 'is invalid without a category_id' do
      categorizing = FactoryBot.build(:categorizing1, category: nil, service: @service)
      categorizing.valid?
      expect(categorizing.errors[:category]).to include('を入力してください')
    end
  end
end
