require 'rails_helper'

RSpec.describe Category, type: :model do
  before do
    @category = FactoryBot.create(:category)
  end
  context 'factory_botの検証' do
    it 'factory_botが有効かどうか' do
      category = @category
      expect(category).to be_valid
    end
  end

  it '名前があれば有効な状態であること' do
    category = @category
    expect(category).to be_valid
  end
  it '名前がなければ無効な状態であること' do
    category = FactoryBot.build(:category, name: nil)
    category.valid?
    expect(category.errors[:name]).to include('を入力してください')
  end
  it '名前が16文字以上なら無効な状態であること' do
    category = FactoryBot.build(:category, name: 'test' * 10)
    category.valid?
    expect(category.errors[:name]).to include('は15文字以内で入力してください')
  end
  it '重複した名前なら無効な状態であること' do
    category = FactoryBot.build(:category)
    category.valid?
    expect(category.errors[:name]).to include('はすでに存在します')
  end
end
