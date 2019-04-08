class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: :index
  before_action :required_admin, only: [:edit, :update, :destroy]
  PER = 10

  def index  
    @subscriptions = Subscription.where(status: 0)
    @categories = Category.all
    @addition = Addition.new
    #カテゴリーで絞り込み
    @subscriptions = @subscriptions.search_with_category(params[:category_id]) if params[:category_id]

    #検索機能
    @subscriptions = @subscriptions.search(params[:search]) if params[:search]
    
    #ソート機能
    @subscriptions = @subscriptions.sort_name if params[:sort_name] #名前順
    @subscriptions = current_user.added_subscriptions if params[:sort_status] #利用中のみ
    @subscriptions = Subscription.sort_with_rank if params[:sort_with_rank] #人気順
    
    #CSV出力
    respond_to do |format|
      format.html
      format.csv { send_data @subscriptions.generate_csv, filename: "subscription-#{Time.zone.now.strftime('%Y%m%d%S')}.csv"}
    end

    #ページネーション
    @subscriptions = @subscriptions.page(params[:page]).per(PER).sort_name
  end

  def new
    @subscription = Subscription.new
  end

  def create
    @subscription = Subscription.new(subscription_params)
    @subscription.status = "secret" unless current_user.admin?
    if @subscription.save
      #一般ユーザーが新規登録する場合、additionにも併せて登録
      Addition.create(user_id: current_user.id, subscription_id: @subscription.id) if @subscription.status == "secret"   
      redirect_to subscriptions_path, notice: "「#{@subscription.name}」を登録しました"
    else
      render 'new'
    end
  end

  def show
    @addition = Addition.new
  end
  
  def edit; end
  
  def update
    if @subscription.update(subscription_params)
      redirect_to subscriptions_path, notice: "「#{@subscription.name}」を更新しました"
    else
      render 'edit'
    end
  end

  def destroy
    @subscription.destroy
    head :no_content
  end

  #CSVインポート
  def import
    Subscription.import(params[:file])
    redirect_to subscriptions_path, notice: "CSVをインポートしました"
  end

  private
  
  def set_subscription
    @subscription = Subscription.find(params[:id])
  end

  def subscription_params
    params.require(:subscription).permit(
      :name, :icon, :icon_cache, :link, :summary, :status, { category_ids: [] }
      )
  end

  #利用者数順にソート
  def rank(subsc_user_ids)
    subsc_user_count = self.joins(:additions).group(:subscription_id).count
    subsc_user_ids = Hash[subsc_user_count.sort_by{ |_, v| -v }].keys
    self.where(id: subsc_user_ids).order_as_specified(id: subsc_user_ids)
  end
end
