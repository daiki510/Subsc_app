class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_correct_user, only: [:show]
  PER = 10

  def show
    @user = User.find(params[:id])
    @details = @user.details
    @subscriptions = @user.added_subscriptions

    #検索機能
    @subscriptions = @subscriptions.where(['name LIKE ?', "%#{params[:search]}%"]) if params[:search]

    #ソート機能
    @subscriptions = @subscriptions.order(name: :asc) if params[:sort_name] #名前順
    @subscriptions = only_not_has_detail(@subscriptions, @details) if params[:sort_not_has_detail] #詳細未登録のみ
    @subscriptions = Kaminari.paginate_array(sort_charge(@details)).page(params[:page]).per(PER) if params[:sort_charge] #利用料金順
    @subscriptions = Kaminari.paginate_array(sort_date(@details)).page(params[:page]).per(PER) if params[:sort_date] #支払日順
    
    #ページネーション
    @subscriptions = @subscriptions.page(params[:page]).per(PER)

    #詳細情報の未登録がある場合は、警告メッセージ表示
    flash[:alert] = "詳細情報が未登録のサブスクリプションがあります" if check_not_register?(@subscriptions,@details)
  end

  private
  #未登録のサブスクリプションを抽出
  def only_has_no_detail(subscriptions, details)
    subsc_ids = subscriptions.map {|subsc| subsc.id} #ユーザーが追加したサブスクリプションのidを抽出
    detail_ids = details.map {|detail| detail.subscription_id} #詳細が登録されているサブスクリプションのidを抽出
    not_has_detail_ids = subsc_ids - detail_ids #両方の配列にないidを算出する
    subscriptions.where(id: not_has_detail_ids)
  end

  #料金順にソート(マイページ)
  def sort_charge(details)
    detail_ids = details.order(charge: :desc).map {|detail| detail.subscription_id}
    Subscription.find(detail_ids).sort_by{ |o| detail_ids.index(o.id)}
  end

  #支払順にソート(マイページ)
  def sort_date(details)
    detail_ids = details.order(due_date: :asc).map {|detail| detail.subscription_id}
    Subscription.find(detail_ids).sort_by{ |o| detail_ids.index(o.id)}
  end

  #詳細情報の未登録があるかどうか
  def check_not_register?(subscriptions,details)
    (subscriptions.pluck(:subscription_id) - details.pluck(:subscription_id)).present?
  end
end
