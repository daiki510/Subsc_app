class DetailsController < ApplicationController
  before_action :set_detail, only: [:show, :edit, :update, :destroy]

  # def index
  #   @details = Detail.all
  # end

  def new
    @detail = Detail.new
  end

  def create
    @detail = Detail.new(detail_params)
    if @detail.save
      redirect_to details_path, notice: "詳細情報を登録しました"
    else
      render 'new'
    end
  end

  def show
  end

  def edit
  end

  def update
    if @detail.update(detail_params)
      redirect_to details_path, notice: "「詳細情報を更新しました"
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
    @detail = Detail.find(params[:id])
  end

  def detail_params
    params.require(:detail).permit(:charge, :due_date, :payment_type, :note)
  end
end
