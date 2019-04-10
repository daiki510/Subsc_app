class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_correct_user, only: [:show]
  PER_PAGE = 10

  def show
    @subscriptions = current_user.subscriptions
    @services = current_user.services

    # 検索機能
    @services = @services.search(params[:search]) if params[:search]

    # ソート機能
    @services = @services.order(name: :asc) if params[:sort_name] # 名前順
    @services = Kaminari.paginate_array(unregistered_subscriptions) if params[:sort_unregistered] # 詳細未登録のみ
    @services = Kaminari.paginate_array(sort_charge(@subscriptions)) if params[:sort_charge] # 利用料金順
    @services = Kaminari.paginate_array(sort_date(@subscriptions)) if params[:sort_date] # 支払日順

    # ページネーション
    @services = @services.page(params[:page]).per(PER_PAGE)
  end

  private

  # 未登録のサブスクリプションを抽出
  def unregistered_subscriptions
    service_ids = Subscription.where(charge: 0).map(&:service_id)
    Service.find(service_ids)
  end

  # 料金順にソート
  def sort_charge(subscriptions)
    service_ids = subscriptions.order(charge: :desc).map(&:service_id)
    Service.find(service_ids).sort_by { |o| service_ids.index(o.id) }
  end

  # 支払順にソート
  def sort_date(subscriptions)
    service_ids = subscriptions.order(due_date: :asc).map(&:service_id)
    Service.find(service_ids).sort_by { |o| service_ids.index(o.id) }
  end
end
