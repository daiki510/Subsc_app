require 'rails_helper'

RSpec.describe Subscription, type: :model do
  # 名前と概要があれば有効な状態であること
  it "is valid with a name, summary"
  # 名前がなければ無効な状態であること
  it "is invalid without a name"
  # 重複した名前なら無効な状態であること
  it "is invalid with a duplicate name"
  # 名前が31文字以上なら無効な状態であること
  it "is invalid with name is 31 or more characters"
end
