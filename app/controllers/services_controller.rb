class ServicesController < ApplicationController
  before_action :set_service, only: %i[show edit update destroy]
  before_action :authenticate_user!, except: :index
  before_action :required_admin, only: %i[edit update destroy]
  PER_PAGE = 10

  def index
    @services = Service.where(status: 0)
    @categories = Category.all
    # カテゴリーで絞り込み
    @services = @services.search_with_category(params[:category_id]) if params[:category_id]

    # 検索機能
    @services = @services.search(params[:search]) if params[:search]

    # ソート機能
    @services = @services.sort_name if params[:sort_name] # 名前順
    @services = current_user.added_services if params[:sort_status] # 利用中のみ
    @services = Service.sort_with_rank if params[:sort_with_rank] # 人気順

    # CSV出力
    respond_to do |format|
      format.html
      format.csv { send_data @services.generate_csv, filename: "service-#{Time.zone.now.strftime('%Y%m%d%S')}.csv" }
    end

    # ページネーション
    @services = @services.page(params[:page]).per(PER_PAGE).sort_name
  end

  def new
    @service = Service.new
  end

  def create
    @service = Service.new(service_params)
    @service.status = 'secret' unless current_user.admin?
    if @service.save
      # 一般ユーザーが新規登録する場合、modelにも併せて登録
      # Model.create(user_id: current_user.id, service_id: @service.id) if @service.status == 'secret'
      redirect_to services_path, notice: "「#{@service.name}」を登録しました"
    else
      render 'new'
    end
  end

  def show; end

  def edit; end

  def update
    if @service.update(service_params)
      redirect_to services_path, notice: "「#{@service.name}」を更新しました"
    else
      render 'edit'
    end
  end

  def destroy
    @service.destroy
    head :no_content
  end

  # CSVインポート
  def import
    Service.import(params[:file])
    redirect_to services_path, notice: 'CSVをインポートしました'
  end

  private

  def set_service
    @service = Service.find(params[:id])
  end

  def service_params
    params.require(:service).permit(
      :name, :icon, :icon_cache, :link, :summary, :status, category_ids: []
    )
  end

  # 利用者数順にソート
  # def rank(subsc_user_ids)
  #   subsc_user_count = joins(:models).group(:service_id).count
  #   subsc_user_ids = Hash[subsc_user_count.sort_by { |_, v| -v }].keys
  #   where(id: subsc_user_ids).order_as_specified(id: subsc_user_ids)
  # end
end
