require 'rails_helper'

RSpec.describe Detail, type: :model do
  before do
    @user1 = FactoryBot.create(:user1)
    @user2 = FactoryBot.create(:user2)
    @subscription = FactoryBot.create(:subscription1)
    @detail1 = FactoryBot.create(:detail1, user: @user1, subscription: @subscription )
    @detail2 = FactoryBot.create(:detail2, user: @user2, subscription: @subscription )
  end
  # factory_botが有効かどうかを検査。
  context "check factorybot of validation" do
    it "has a valid factory of detail1" do
      detail = @detail1
      expect(detail).to be_valid
    end
    it "has a valid factory of detail2" do
      detail = @detail2
      expect(detail).to be_valid
    end
  end

  # 料金、支払日があれば有効な状態であること
  it "is valid with a charge, due_date" do
    detail = @detail1
    expect(detail).to be_valid
  end
  # 料金がなければ無効な状態であること
  it "is invalid without a charge" do
    detail = FactoryBot.build(:detail1, charge: nil, user: @user1, subscription: @subscription )
    detail.valid?
    expect(detail.errors[:charge]).to include("を入力してください")
  end
  # 料金が11文字以上なら無効な状態であること
  it "is invalid with charge which has 11 or more characters" do
    detail = FactoryBot.build(:detail1, charge: 10000000000, user: @user1, subscription: @subscription )
    detail.valid?
    expect(detail.errors[:charge]).to include("は10文字以内で入力してください")
  end
  # 備考欄が256文字以上なら無効な状態であること
  it "is invalid with note which has 256 or more characters" do
    detail = FactoryBot.build(:detail1, note: "test"*100, user: @user1, subscription: @subscription )
    detail.valid?
    expect(detail.errors[:note]).to include("は255文字以内で入力してください")
  end
end