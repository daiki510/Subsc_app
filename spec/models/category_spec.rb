require 'rails_helper'

RSpec.describe Category, type: :model do
  before do
    @category = FactoryBot.create(:category)
  end
  # factory_botが有効かどうかを検査。
  context "check factorybot of validation" do
    it "has a valid factory of category" do
      category = @category
      expect(category).to be_valid
    end
  end

  # 名前があれば有効な状態であること
  it "is valid with a title,email,message" do
    category = @category
    expect(category).to be_valid
  end
  # 名前がなければ無効な状態であること
  it "is invalid without a name" do
    category = FactoryBot.build(:category, name: nil)
    category.valid?
    expect(category.errors[:name]).to include("を入力してください")
  end
  # 名前が31文字以上なら無効な状態であること
  it "is invalid with title which has 31 or more characters" do
    category = FactoryBot.build(:category, name: "test"*10)
    category.valid?
    expect(category.errors[:name]).to include("は30文字以内で入力してください")
  end
  # 重複した名前なら無効な状態であること
  it "is invalid with a duplicate name" do
    category = FactoryBot.build(:category)
    category.valid?
    expect(category.errors[:name]).to include("はすでに存在します")
  end
end
