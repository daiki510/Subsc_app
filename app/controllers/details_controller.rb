class DetailsController < ApplicationController
  before_action :set_detail, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user！

  # def index
  #   @details = Detail.all
  # end

  def new
    @detail = current_user.details.new(subscription_id: params[:subscription_id])
  end

  def create
    @detail = Detail.new(detail_params)
    if @detail.save
      redirect_to user_path(current_user.id), notice: "詳細情報を登録しました"
    else
      render 'new'
    end
  end

  def show
    # @detail = Detail.find_by(user_id: current_user.id, subscription_id: params[:subscription_id])
    @subsc = Subscription.find_by(id: @detail.subscription_id) 
  end

  def edit
  end

  def update
    if @detail.update(detail_params)
      redirect_to user_path(current_user.id), notice: "詳細情報を更新しました"
    else
      render 'edit'
    end
  end

  # additionsを削除したと同時にdetailも削除されるようにする
  # def destroy
  #   @detail.destroy
  #   redirect_to details_path, notice: "「#{@detail.name}」を削除しました"
  # end

  private

  def set_detail
    @detail = Detail.find_by(user_id: current_user.id, subscription_id: params[:subscription_id])
  end

  def detail_params
    params.require(:detail).permit(:charge, :due_date, :payment_type, :note, :user_id, :subscription_id)
  end
end
