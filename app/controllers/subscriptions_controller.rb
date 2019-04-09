class ServicesController < ApplicationController
  before_action :set_subscription, only: %i[show edit]
  before_action :authenticate_user!

  def new
    @subscription = Subscription.new(service_id: params[:service_id])
  end

  def create
    @subscription = Subscription.new(subscription_params)
    if @subscription.save
      redirect_to user_path(current_user.id), notice: '詳細情報を登録しました'
    else
      render 'new'
    end
  end

  def show
    @service = Service.find_by(id: @subscription.service_id)
  end

  def edit
    @service = Service.find_by(id: @subscription.service_id)
  end

  def update
    @subscription = Subscription.find(params[:id])
    if @subscription.update(subscription_params)
      redirect_to user_path(current_user.id), notice: '詳細情報を更新しました'
    else
      render 'edit'
    end
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    # @model = Model.find_by(user_id: current_user.id, service_id: @subscription.service_id)
    @service = Service.find_by(id: @subscription.service_id)
    @subscription.destroy
    # @model.destroy
    @service.destroy if @service.status == 'secret'
    redirect_to user_path(current_user.id), notice: 'マイページから削除しました'
  end

  private

  def set_subscription
    @subscription = Subscription.find_by(user_id: current_user.id, service_id: params[:service_id])
  end

  def subscription_params
    params.require(:subscription).permit(:charge, :due_date, :payment_type, :note, :user_id, :service_id)
  end
end
