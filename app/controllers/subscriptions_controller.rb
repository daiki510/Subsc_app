class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]

  def index
    @subscriptions = Subscription.all
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
    params.require(:subscription).permit(:name, :icon, :summary, :status)
  end
end
