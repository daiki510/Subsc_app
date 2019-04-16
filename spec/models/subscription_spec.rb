require 'rails_helper'

RSpec.describe Subscription, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @service = FactoryBot.create(:service, user: @user)
    @subscription = FactoryBot.create(:subscription, user: @user, service: @service)
  end
  context 'factory_botの検証' do
    it 'actory_botが有効かどうか' do
      subscription = @subscription
      expect(subscription).to be_valid
    end
  end

  it '料金、支払日があれば有効な状態であること' do
    subscription = @subscription
    expect(subscription).to be_valid
  end
  it '料金がなければ無効な状態であること' do
    subscription = FactoryBot.build(:subscription, charge: nil, user: @user, service: @service)
    subscription.valid?
    expect(subscription.errors[:charge]).to include('を入力してください')
  end
  it '料金が11桁以上なら無効な状態であること' do
    subscription = FactoryBot.build(:subscription, charge: 10_000_000_000, user: @user, service: @service)
    subscription.valid?
    expect(subscription.errors[:charge]).to include('は10文字以内で入力してください')
  end
  it '備考欄が256文字以上なら無効な状態であること' do
    subscription = FactoryBot.build(:subscription, note: 'test' * 100, user: @user, service: @service)
    subscription.valid?
    expect(subscription.errors[:note]).to include('は255文字以内で入力してください')
  end
  it '料金が6桁以上なら無効な状態であること' do
    subscription = FactoryBot.build(:subscription, charge: 10_000 * 10_000, user: @user, service: @service)
    subscription.valid?
    expect(subscription.errors[:charge]).to include('は1000000より小さい値にしてください')
  end
end
