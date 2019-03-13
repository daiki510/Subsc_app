class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :additions, dependent: :destroy
  has_many :added_subscriptions, through: :additions, source: :subscription

  has_many :details, dependent: :destroy
  has_many :detailed_subscriptions, through: :details, source: :subscription

  def already_added?(subscription)
    self.additions.exists?(subscription_id: subscription.id)
  end
end
