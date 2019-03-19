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
    @subscriptions = sort_charge(@details) if params[:sort_charge] #利用料金順
    @subscriptions = sort_date(@details) if params[:sort_date] #支払日順
  end

  private
  #未登録のサブスクリプションを抽出
  def only_not_has_detail(subscriptions, details)
    subsc_ids = subscriptions.map {|subsc| subsc.id} #ユーザーが追加したサブスクリプションのidを抽出
    detail_ids = details.map {|detail| detail.subscription_id} #詳細が登録されているサブスクリプションのidを抽出
    not_has_detail_ids = subsc_ids - detail_ids #両方の配列にないidを算出する
    subscriptions.where(id: not_has_detail_ids)
  end
  
  #料金順にソート
  def sort_charge(details)
    detail_ids = details.order(charge: :desc).map {|detail| detail.subscription_id}
    Subscription.find(detail_ids).sort_by{ |o| detail_ids.index(o.id)}
  end

  #支払順にソート
  def sort_date(details)
    detail_ids = details.order(due_date: :asc).map {|detail| detail.subscription_id}
    Subscription.find(detail_ids).sort_by{ |o| detail_ids.index(o.id)}
  end
end
