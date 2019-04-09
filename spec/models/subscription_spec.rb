require 'rails_helper'

RSpec.describe Subscription, type: :model do
  before do
    @user1 = FactoryBot.create(:user1)
    @user2 = FactoryBot.create(:user2)
    @service = FactoryBot.create(:service1)
    @subscription1 = FactoryBot.create(:subscription1, user: @user1, service: @service)
    @subscription2 = FactoryBot.create(:subscription2, user: @user2, service: @service)
  end
  # factory_botが有効かどうかを検査。
  context 'check factorybot of validation' do
    it 'has a valid factory of subscription1' do
      subscription = @subscription1
      expect(subscription).to be_valid
    end
    it 'has a valid factory of subscription2' do
      subscription = @subscription2
      expect(subscription).to be_valid
    end
  end

  # 料金、支払日があれば有効な状態であること
  it 'is valid with a charge, due_date' do
    subscription = @subscription1
    expect(subscription).to be_valid
  end
  # 料金がなければ無効な状態であること
  it 'is invalid without a charge' do
    subscription = FactoryBot.build(:subscription1, charge: nil, user: @user1, service: @service)
    subscription.valid?
    expect(subscription.errors[:charge]).to include('を入力してください')
  end
  # 料金が11文字以上なら無効な状態であること
  it 'is invalid with charge which has 11 or more characters' do
    subscription = FactoryBot.build(:subscription1, charge: 10_000_000_000, user: @user1, service: @service)
    subscription.valid?
    expect(subscription.errors[:charge]).to include('は10文字以内で入力してください')
  end
  # 備考欄が256文字以上なら無効な状態であること
  it 'is invalid with note which has 256 or more characters' do
    subscription = FactoryBot.build(:subscription1, note: 'test' * 100, user: @user1, service: @service)
    subscription.valid?
    expect(subscription.errors[:note]).to include('は255文字以内で入力してください')
  end
  # 料金が6桁以上なら無効な状態であること
  it 'is invalid with charge which has 6 figure or more figures' do
    subscription = FactoryBot.build(:subscription1, charge: 10_000 * 10_000, user: @user1, service: @service)
    subscription.valid?
    expect(subscription.errors[:charge]).to include('は1000000より小さい値にしてください')
  end
end
