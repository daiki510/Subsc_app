class SubscriptionsController < ApplicationController
  include Common
  before_action :set_subscription, only: %i[show edit update destroy]
  before_action :authenticate_user!

  def new
    @subscription = subscriptions.new(service_id: params[:service_id])
  end

  def create
    @subscription = subscriptions.new(subscription_params)
    if @subscription.save
      redirect_to services_path, notice: "「#{service_name(@subscription)}」を追加しました"
    else
      render 'new'
    end
  end

  def show; end

  def edit; end

  def update
    # raise
    if @subscription.update(subscription_params)
      redirect_to user_path(current_user.id), notice: "「#{service_name(@subscription)}」を更新しました"
    else
      render 'edit'
    end
  end

  def destroy
    @subscription.destroy
    flash[:alert] = "「#{service_name(@subscription)}」を利用一覧から外しました"
    if params[:back_to_mypage]
      redirect_to user_path(current_user)
    else
      redirect_to services_path
    end
  end

  private

  def set_subscription
    @subscription = subscriptions.find(params[:id])
  end

  def subscription_params
    params.require(:subscription).permit(:charge, :due_date, :note, :user_id, :service_id)
  end

  def service_name(subscription)
    Service.find_by(id: subscription.service_id).name
  end
end
