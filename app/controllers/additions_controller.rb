class AdditionsController < ApplicationController
  def create
    @addition = current_user.additions.create(subscription_id: params[:subscription_id])
    redirect_to subscriptions_path, notice: "「#{@addition.subscription.name}」を追加しました"
  end

  def destroy
    @addition = Addition.find_by(subscription_id: params[:subscription_id], user_id: current_user.id)
    @addition.destroy
    redirect_to subscriptions_path, notice: "「#{@addition.subscription.name}」を利用一覧から外しました"
  end
end
