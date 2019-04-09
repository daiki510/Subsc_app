class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_correct_user, only: [:show]
  PER_PAGE = 10

  def show
    @services = current_user.services
    @services = current_user.added_services

    # 詳細情報の未登録がある場合は、警告メッセージ表示
    flash.now[:alert] = '詳細情報が未登録のサブスクリプションがあります' if unregistered_service?(@services, @services)

    # 検索機能
    @services = @services.search(params[:search]) if params[:search]

    # ソート機能
    @services = @services.order(name: :asc) if params[:sort_name] # 名前順
    @services = only_has_no_service(@services, @services) if params[:sort_not_has_service] # 詳細未登録のみ
    @services = Kaminari.paginate_array(sort_charge(@services)) if params[:sort_charge] # 利用料金順
    @services = Kaminari.paginate_array(sort_date(@services)) if params[:sort_date] # 支払日順

    # ページネーション
    @services = @services.page(params[:page]).per(PER_PAGE)
  end

  private

  # 未登録のサブスクリプションを抽出
  def unregistered_service?(services, services)
    (services.pluck(:id) - services.pluck(:service_id)).present?
  end

  # 料金順にソート(マイページ)
  def sort_charge(services)
    service_ids = services.order(charge: :desc).map(&:service_id)
    Service.find(service_ids).sort_by { |o| service_ids.index(o.id) }
  end

  # 支払順にソート(マイページ)
  def sort_date(services)
    service_ids = services.order(due_date: :asc).map(&:service_id)
    Service.find(service_ids).sort_by { |o| service_ids.index(o.id) }
  end
end
