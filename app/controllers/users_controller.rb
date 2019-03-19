class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :required_admin, only: [:index]
  before_action :ensure_correct_user, only: [:show]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @subscriptions = @user.added_subscriptions
    @details = @user.details

    #検索機能
    @subscriptions = @subscriptions.where(['name LIKE ?', "%#{params[:search]}%"]) if params[:search]

    #ソート機能
    @subscriptions = @subscriptions.order(name: :asc) if params[:sort_name]
    @subscriptions = only_not_has_detail(@subscriptions, @details) if params[:sort_not_has_detail]
    
    # @subscriptions = current_user.added_subscriptions if params[:sort_charge]
    # @subscriptions = rank(params) if params[:sort_date]
    
  end

  private
  #未登録のサブスクリプションを抽出
  def only_not_has_detail(subscriptions, details)
    subsc_ids = subscriptions.map {|subsc| subsc.id}
    detail_ids = details.map {|detail| detail.subscription_id}
    not_has_detail_ids = subsc_ids - detail_ids
    subscriptions.where(id: not_has_detail_ids)
  end

  # def rank(params) 
  #   subsc_user_count = Subscription.joins(:additions).group(:subscription_id).count
  #   subsc_user_ids = Hash[subsc_user_count.sort_by{ |_, v| -v }].keys
  #   Subscription.find(subsc_user_ids).sort_by{ |o| subsc_user_ids.index(o.id)}
  # end
end
