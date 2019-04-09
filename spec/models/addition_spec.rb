require 'rails_helper'

RSpec.describe Addition, type: :model do
  before do
    @user = FactoryBot.create(:user1)
    @subscription1 = FactoryBot.create(:subscription1)
    @subscription2 = FactoryBot.create(:subscription2)
    @addition1 = FactoryBot.create(:addition1, user: @user, subscription: @subscription1)
    @addition2 = FactoryBot.create(:addition2, user: @user, subscription: @subscription2)
  end
  context 'If it is valid' do
    # user_idとsubscription_idがあれば有効な状態であること
    it 'is valid with user_id, subscription_id' do
      addition = @addition1
      expect(addition).to be_valid
    end
    # 一人のユーザーが複数のサブスクリプションを追加できること。
    it 'is valid a user can add two or more subscriptions' do
      addition1 = @addition1
      addition2 = @addition2
      expect(addition1).to be_valid
      expect(addition2).to be_valid
    end
  end
  context 'If it is invalid' do
    # サブスクリプションがなければ無効な状態であること
    it 'is invalid without a subscription_id' do
      addition = FactoryBot.build(:addition1, user: @user, subscription: nil)
      addition.valid?
      expect(addition.errors[:subscription]).to include('を入力してください')
    end
    # ユーザーがなければ無効な状態であること
    it 'is invalid without a user_id' do
      addition = FactoryBot.build(:addition1, user: nil, subscription: @subscription1)
      addition.valid?
      expect(addition.errors[:user]).to include('を入力してください')
    end
  end
end
