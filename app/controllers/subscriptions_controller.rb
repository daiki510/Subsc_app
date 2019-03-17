class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :required_admin, only: [:edit, :update, :destroy]

  def index
    #カテゴリーで絞り込み
    if params[:category_id]
      @subscriptions = Subscription.search_with_category(params[:category_id])
    end
    
    @subscriptions = Subscription.all
    @addition = Addition.new
  end

  def new
    @subscription = Subscription.new
    # @subscription.subscs_categories.build
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
  
  def edit
  end
  
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
end
