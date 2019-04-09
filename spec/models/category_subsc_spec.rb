require 'rails_helper'

RSpec.describe CategorySubsc, type: :model do
  before do
    @subscription = FactoryBot.create(:subscription1)
    @category1 = FactoryBot.create(:category1)
    @category2 = FactoryBot.create(:category2)
    @category_subsc1 = FactoryBot.create(:category_subsc1, subscription: @subscription, category: @category1)
    @category_subsc2 = FactoryBot.create(:category_subsc2, subscription: @subscription, category: @category2)
  end
  context 'If it is valid' do
    # subscription_idとcategory_idがあれば有効な状態であること
    it 'is valid with category_id, subscription_id' do
      category_subsc = @category_subsc1
      expect(category_subsc).to be_valid
    end
    # 一つのサブスクリプションに複数のカテゴリーを登録できること。
    it 'is valid a subscription can have two or more categories' do
      category_subsc1 = @category_subsc1
      category_subsc2 = @category_subsc2
      expect(category_subsc1).to be_valid
      expect(category_subsc2).to be_valid
    end
  end
  context 'If it is invalid' do
    # サブスクリプションがなければ無効な状態であること
    it 'is invalid without a subscription_id' do
      category_subsc = FactoryBot.build(:category_subsc1, category: @category1, subscription: nil)
      category_subsc.valid?
      expect(category_subsc.errors[:subscription]).to include('を入力してください')
    end
    # カテゴリーがなければ無効な状態であること
    it 'is invalid without a category_id' do
      category_subsc = FactoryBot.build(:category_subsc1, category: nil, subscription: @subscription)
      category_subsc.valid?
      expect(category_subsc.errors[:category]).to include('を入力してください')
    end
  end
end
