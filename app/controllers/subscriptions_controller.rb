class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: %i[show edit update destroy]
  before_action :authenticate_user!

  def new
    @subscription = current_user.subscriptions.new(service_id: params[:service_id])
  end

  def create
    @subscription = current_user.subscriptions.new(subscription_params)
    if @subscription.save
      redirect_to services_path, notice: 'サブスクリプションを登録しました'
    else
      render 'new'
    end
  end

  def show; end

  def edit; end

  def update
    if @subscription.update(subscription_params)
      redirect_to user_path(current_user.id), notice: 'サブスクリプションを更新しました'
    else
      render 'edit'
    end
  end

  def destroy
    @subscription.destroy
    redirect_to services_path, notice: 'マイページから削除しました'
  end

  private

  def set_subscription
    @subscription = current_user.subscriptions.find(params[:id])
  end

  def subscription_params
    params.require(:subscription).permit(:charge, :due_date, :payment_type, :note, :user_id, :service_id)
  end
end
