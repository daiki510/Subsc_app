class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
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
   
    #ページネーション
    @subscriptions = @subscriptions.page(params[:page]).per(PER)
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
    # redirect_to subscriptions_path, notice: "「#{@subscription.name}」を削除しました"
  end

  private
  
  def set_subscription
    @subscription = Subscription.find(params[:id])
  end

  def subscription_params
    params.require(:subscription).permit(:name, :icon, :icon_cache, :link, :summary, :status, { category_ids: [] })
  end

  def rank(subsc_user_ids)
    subsc_user_count = self.joins(:additions).group(:subscription_id).count
    subsc_user_ids = Hash[subsc_user_count.sort_by{ |_, v| -v }].keys
    self.where(id: subsc_user_ids).order_as_specified(id: subsc_user_ids)
    # subscriptions = Subscription.find(subsc_user_ids).sort_by{ |o| subsc_user_ids.index(o.id)}
  end

  # def rank
  #   subsc_user_count = Subscription.joins(:additions).group(:subscription_id).count
  #   subsc_user_ids = Hash[subsc_user_count.sort_by{ |_, v| -v }].keys
  #   Subscription.where(id: subsc_user_ids).order_by_ids(subsc_user_ids).map(&:id) 
  #   # Subscription.find(subsc_user_ids).sort_by{ |o| subsc_user_ids.index(o.id)}
  #   # raise
  #   # Subscription.where(id: subsc_user_ids).order_as_specified(id: subsc_user_ids)
  #   # Subscription.where(id: subscriptions.map{ |subscription| subscription.id })
  # end

  # def order_by_ids(ids)
  #   order_by = ["case"]
  #   ids.each_with_index.map do |id, index|
  #     order_by << "WHEN id='#{id}' THEN #{index}"
  #   end
  #   order_by << "end"
  #   order(order_by.join(" "))
  # end

  # def rank
  #   subscriptions =Subscription.joins(:additions).select('subscriptions.id, count(additions.id) as additions_count').group(:id).order('additions_count desc')
  #   raise
  # end
end
