class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :required_admin, only: [:edit, :update, :destroy]

  def index  
    @subscriptions = Subscription.all
    @categories = Category.all
    @addition = Addition.new

    #カテゴリーで絞り込み
    @subscriptions = Subscription.search_with_category(params[:category_id]) if params[:category_id]

    #検索機能
    @subscriptions = Subscription.search(params[:search]) if params[:search]

    #ソート機能
    @subscriptions = @subscriptions.sort_name if params[:sort_name]
    @subscriptions = current_user.added_subscriptions if params[:sort_status]
    @subscriptions = rank(params) if params[:sort_count]
  end

  def new
    @subscription = Subscription.new
  end

  def create
    @subscription = Subscription.new(subscription_params)
    if @subscription.save
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
    redirect_to subscriptions_path, notice: "「#{@subscription.name}」を削除しました"
  end

  private

  def set_subscription
    @subscription = Subscription.find(params[:id])
  end

  def subscription_params
    params.require(:subscription).permit(:name, :icon, :summary, :status, { category_ids: [] })
  end

  def rank(params) 
    subsc_user_count = Subscription.joins(:additions).group(:subscription_id).count
    subsc_user_ids = Hash[subsc_user_count.sort_by{ |_, v| -v }].keys
    Subscription.find(subsc_user_ids).sort_by{ |o| subsc_user_ids.index(o.id)}
  end
end
