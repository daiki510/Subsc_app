class User < ApplicationRecord
  #gem:OrderAsSpecifiedの読み込み
  extend OrderAsSpecified

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  #アソシエーション
  has_many :contacts, dependent: :destroy

  has_many :additions, dependent: :destroy
  has_many :added_subscriptions, through: :additions, source: :subscription

  has_many :details, dependent: :destroy
  has_many :detailed_subscriptions, through: :details, source: :subscription

  #enumの定義
  enum notification_status: { off: 0, one: 1, two: 2 }

  #スコープ
  scope :search_with_category, -> (category_id){ where(id: category_ids = CategorySubsc.where(category_id: category_id).pluck(:subscription_id))}
  scope :sort_name, -> { order(name: :asc) }
  # scope :sort_charge, -> (detail_ids){where(id: detail_ids).order_as_specified(id: detail_ids)}

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

  def localed_statuses
    notification_statuses.keys.map do |s|
      [ApplicationController.helpers.t("status.article.#{s}"), s]
    end
  end

  #料金順メソッド
  # def sort_charge(details)
  #   detail_ids = details.order(charge: :desc).pluck(:subscription_id)
  #   where(id: detail_ids).order_as_specified(id: detail_ids)
  # end
end
