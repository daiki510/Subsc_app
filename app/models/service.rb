class Service < ApplicationRecord
  extend OrderAsSpecified

  has_many :subscriptions, dependent: :destroy
  has_many :users, through: :subscriptions, source: :user
  has_many :categorizings, dependent: :destroy
  has_many :categories, through: :categorizings, source: :category

  belongs_to :user

  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :summary, presence: true, length: { maximum: 255 }
  validates :link, format: /\A#{URI.regexp(%w[http https])}\z/, allow_blank: true

  mount_uploader :icon, IconUploader

  enum status: { open: 0, secret: 9, development: 5 }

  scope :search_with_category, ->(category_id) { where(id: category_ids = Categorizing.where(category_id: category_id).pluck(:service_id)) }
  scope :search_open_status, -> { where(status: 0) }
  scope :search_secret_status, -> { where(status: 9) }
  scope :search_with_user_id, ->(user) { where(user_id: user.id) }
  scope :search_with_using, ->(user) { where(id: user.subscriptions.map(&:service_id)) }
  scope :search_with_unregisterd, ->(user) { where(id: Subscription.where(charge: 0).where(user_id: user.id).map(&:service_id)) }
  scope :sort_name, -> { order(name: :asc) }
  scope :sort_create, -> { order(created_at: :desc) }
  scope :sort_update, -> { order(updated_at: :desc) }

  # 検索メソッド
  def self.search(search)
    return where(['name ILIKE ?', "%#{search}%"]) if search

    all
  end

  # 利用者数順にソート
  def self.sort_with_user_count
    using_count = Subscription.group(:service_id).count
    service_ids = Hash[using_count.sort_by { |_, v| -v }].keys
    where(id: service_ids).where(status: 0).order_as_specified(id: service_ids)
  end

  # 料金順にソート
  def self.sort_charge
    service_ids = Subscription.order(charge: :desc).map(&:service_id)
    where(id: service_ids).order_as_specified(id: service_ids)
  end

  # 支払順にソート
  def self.sort_date
    service_ids = Subscription.order(due_date: :asc).map(&:service_id)
    where(id: service_ids).order_as_specified(id: service_ids)
  end

  # CSVエクスポート
  def self.csv_attributes
    %w[name summary link user_id created_at updated_at]
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
