class User < ApplicationRecord
  #gem:OrderAsSpecifiedの読み込み
  extend OrderAsSpecified

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # バリデーション
  validates :name, presence: true, length: {maximum: 30}

  #アソシエーション
  has_many :contacts, dependent: :destroy

  has_many :additions, dependent: :destroy
  has_many :added_subscriptions, through: :additions, source: :subscription

  has_many :details, dependent: :destroy
  has_many :detailed_subscriptions, through: :details, source: :subscription

  #enumの定義
  enum notification_status: { notifications_off: 0, notifications_one: 1, notifications_two: 2 }

  #スコープ
  scope :search_with_category, -> (category_id){ where(id: category_ids = CategorySubsc.where(category_id: category_id).pluck(:subscription_id))}
  scope :sort_name, -> { order(name: :asc) }

  #追加されたサブスクリプションかどうか
  def already_added?(subscription)
    self.additions.exists?(subscription_id: subscription.id)
  end

  #検索メソッド
  def self.search(search)
    if search
      User.where(['name LIKE ?', "%#{search}%"])
    else
      User.all
    end
  end
end
