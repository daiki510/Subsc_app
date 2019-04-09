class Service < ApplicationRecord
  # gem:OrderAsSpecifiedの読み込み
  extend OrderAsSpecified

  # アソシエーション
  has_many :services, dependent: :destroy
  has_many :subscripted_users, through: :services, source: :user

  has_many :categorizings, dependent: :destroy
  has_many :categories, through: :categorizings, source: :category

  # バリデーション
  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :summary, presence: true, length: { maximum: 255 }
  validates :link, format: /\A#{URI.regexp(%w[http https])}\z/, allow_blank: true

  # 画像アップロード
  mount_uploader :icon, IconUploader

  # enumの定義
  enum status: { open: 0, secret: 9, development: 5 }

  # スコープ
  scope :search_with_category, ->(category_id) { where(id: category_ids = CategorySubsc.where(category_id: category_id).pluck(:service_id)) }
  scope :sort_name, -> { order(name: :asc) }

  # 検索メソッド
  def self.search(search)
    if search
      where(['name LIKE ?', "%#{search}%"])
    else
      all
    end
  end

  # ランキングメソッド
  # def self.sort_with_rank
  #   subsc_user_count = joins(:models).group(:service_id).count
  #   subsc_user_ids = Hash[subsc_user_count.sort_by { |_, v| -v }].keys
  #   where(id: subsc_user_ids).order_as_specified(id: subsc_user_ids)
  # end

  # CSVエクスポート
  def self.csv_attributes
    %w[name summary link created_at updated_at]
  end

  def self.generate_csv
    CSV.generate(headers: true) do |csv|
      csv << csv_attributes
      all.find_each do |service|
        csv << csv_attributes.map { |attr| service.send(attr) }
      end
    end
  end

  # CSVインポート
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      service = Service.new
      service.attributes = row.to_hash.slice(*csv_attributes)
      service.save!
    end
  end
end
