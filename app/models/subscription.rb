class Subscription < ApplicationRecord
  #gem:OrderAsSpecifiedの読み込み
  extend OrderAsSpecified

  #アソシエーション
  has_many :additions, dependent: :destroy
  has_many :added_users, through: :additions, source: :user

  has_many :details, dependent: :destroy
  has_many :detailed_users, through: :details, source: :user

  has_many :category_subscs, dependent: :destroy
  has_many :categories, through: :category_subscs, source: :category

  #バリデーション
  validates :name, presence: true, uniqueness: true, length: {maximum: 30}
  validates :icon, presence: true
  validates :summary, presence: true, length: {maximum: 255}

  #画像アップロード
  mount_uploader :icon, IconUploader
  
  #enumの定義
  enum status: { open: 0, secret: 9, development: 5 }

  #スコープ
  scope :search_with_category, -> (category_id){ where(id: category_ids = CategorySubsc.where(category_id: category_id).pluck(:subscription_id))}
  scope :sort_name, -> { order(name: :asc) }
  
  #検索メソッド
  def self.search(search)
    if search
      self.where(['name LIKE ?', "%#{search}%"])
    else
      self.all
    end
  end

  #ランキングメソッド
  def self.sort_with_rank
    subsc_user_count = self.joins(:additions).group(:subscription_id).count
    subsc_user_ids = Hash[subsc_user_count.sort_by{ |_, v| -v }].keys
    self.where(id: subsc_user_ids).order_as_specified(id: subsc_user_ids)
  end
end
