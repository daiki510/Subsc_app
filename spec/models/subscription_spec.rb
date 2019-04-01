require 'rails_helper'

RSpec.describe Subscription, type: :model do
  # 名前と概要があれば有効な状態であること
  it "is valid with a name, summary" do
    subscription = Subscription.new(
      name: "test_name",
      summary: "test_summary"
    )
    expect(subscription).to be_valid
  end
  # 名前がなければ無効な状態であること
  it "is invalid without a name" do
    subscription = Subscription.new(name: nil)
    subscription.valid?
    expect(subscription.errors[:name]).to include("を入力してください")
  end
  # 重複した名前なら無効な状態であること
  it "is invalid with a duplicate name" do
    Subscription.create(
      name: "test_name",
      summary: "test_summary1"
    )
    subscription = Subscription.new(
      name: "test_name",
      summary: "test_summary2"
    )
    subscription.valid?
    expect(subscription.errors[:name]).to include("はすでに存在します")
  end
  # 名前が31文字以上なら無効な状態であること
  it "is invalid with name which has 31 or more characters" do
    subscription = Subscription.new(
      name: "test"*10,
      summary: "test_summary2"
    )
    subscription.valid?
    expect(subscription.errors[:name]).to include("は30文字以内で入力してください")
  end
  # 概要が256文字以上なら無効な状態であること
  it "is invalid with summary which has 256 or more characters" do
    subscription = Subscription.new(
      name: "test_name",
      summary: "test"*100
    )
    subscription.valid?
    expect(subscription.errors[:summary]).to include("は255文字以内で入力してください")
  end
  # URLの書式が有効な状態であること
  it "is valid with link which is collect format" do
    subscription = Subscription.new(
      name: "test_name",
      summary: "test_summary",
      link: "https://www.amazon.co.jp/"
    )
    expect(subscription).to be_valid
  end
  # URLの書式が無効な状態であること
  it "is invalid with link which is incollect format" do
    subscription = Subscription.new(
      name: "test_name",
      summary: "test_summary",
      link: "amazon"
    )
    subscription.valid?
    expect(subscription.errors[:link]).to include("は不正な値です")
  end
end
