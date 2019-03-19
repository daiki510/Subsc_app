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
    @subscriptions = @subscriptions.order(name: :asc) if params[:sort_name] #名前順
    @subscriptions = only_not_has_detail(@subscriptions, @details) if params[:sort_not_has_detail] #詳細未登録のみ
    @subscriptions = sort_charge(@details,@subscriptions) if params[:sort_charge] #利用料金順
    # @subscriptions = current_user.added_subscriptions if params[:sort_charge]

  end

  private
  #未登録のサブスクリプションを抽出
  def only_not_has_detail(subscriptions, details)
    subsc_ids = subscriptions.map {|subsc| subsc.id}
    detail_ids = details.map {|detail| detail.subscription_id}
    not_has_detail_ids = subsc_ids - detail_ids
    subscriptions.where(id: not_has_detail_ids)
  end

  def sort_charge(details,subscriptions)
    detail_ids = details.order(charge: :desc).map {|detail| detail.subscription_id}
    Subscription.find(detail_ids).sort_by{ |o| detail_ids.index(o.id)}
  end

  def sort_date(details,subscriptions)
    # detail_ids = details.order(charge: :desc).map {|detail| detail.subscription_id}
    # Subscription.find(detail_ids).sort_by{ |o| detail_ids.index(o.id)}
  end
end
