require 'rails_helper'

RSpec.describe User, type: :model do
  # 名前と概要があれば有効な状態であること
  it "is valid with a name, summary" do
    user = User.new(
      name: "test_name",
      summary: "test_summary"
    )
    expect(user).to be_valid
  end
  # 名前がなければ無効な状態であること
  it "is invalid without a name" do
    user = User.new(name: nil)
    user.valid?
    expect(user.errors[:name]).to include("を入力してください")
  end
  # 重複した名前なら無効な状態であること
  it "is invalid with a duplicate name" do
    User.create(
      name: "test_name",
      summary: "test_summary1"
    )
    user = User.new(
      name: "test_name",
      summary: "test_summary2"
    )
    user.valid?
    expect(user.errors[:name]).to include("はすでに存在します")
  end
  # 名前が31文字以上なら無効な状態であること
  it "is invalid with name which has 31 or more characters" do
    user = User.new(
      name: "test"*10,
      summary: "test_summary2"
    )
    user.valid?
    expect(user.errors[:name]).to include("は30文字以内で入力してください")
  end
  # 概要が256文字以上なら無効な状態であること
  it "is invalid with summary which has 256 or more characters" do
    user = User.new(
      name: "test_name",
      summary: "test"*100
    )
    user.valid?
    expect(user.errors[:summary]).to include("は255文字以内で入力してください")
  end
  # URLの書式が有効な状態であること
  it "is valid with link which is collect format" do
    user = User.new(
      name: "test_name",
      summary: "test_summary",
      link: "https://www.amazon.co.jp/"
    )
    expect(user).to be_valid
  end
  # URLの書式が無効な状態であること
  it "is invalid with link which is incollect format" do
    user = User.new(
      name: "test_name",
      summary: "test_summary",
      link: "amazon"
    )
    user.valid?
    expect(user.errors[:link]).to include("は不正な値です")
  end
end
