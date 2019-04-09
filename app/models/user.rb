class User < ApplicationRecord
  # gem:OrderAsSpecifiedの読み込み
  extend OrderAsSpecified

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[google]

  # バリデーション
  validates :name, presence: true, length: { maximum: 30 }

  # アソシエーション
  has_many :contacts, dependent: :destroy

  has_many :subscriptions, dependent: :destroy
  has_many :services, through: :subscriptions, source: :service

  # enumの定義
  enum notification_status: { notifications_off: 0, notifications_one: 1, notifications_two: 2 }

  # スコープ
  scope :search_with_category, ->(category_id) { where(id: category_ids = Categorizing.where(category_id: category_id).pluck(:service_id)) }
  scope :sort_name, -> { order(name: :asc) }

  # 検索メソッド
  def self.search(search)
    return where(['name LIKE ?', "%#{search}%"]) if search

    all
  end

  def self.from_omniauth(auth)
    user = User.find_by(email: auth.info.email)
    user ||= User.new(
      email: auth.info.email,
      provider: auth.provider,
      uid: auth.uid,
      name: auth.info.name,
      password: Devise.friendly_token[0, 20]
    )
    user.save
    user
  end

  # 新規登録時にuidカラムをランダムに自動生成
  def self.create_unique_string
    SecureRandom.uuid
  end
end
