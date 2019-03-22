class AdditionsController < ApplicationController
  def create
    @addition = current_user.additions.create(subscription_id: params[:subscription_id])
    redirect_to subscriptions_path, notice: "「#{@addition.subscription.name}」を追加しました"
  end

  def destroy
    @addition = Addition.find_by(subscription_id: params[:subscription_id], user_id: current_user.id)
    @subscription = Subscription.find_by(id: @addition.subscription_id)
    @addition.destroy
    if @subscription.status == "secret"
      @subscription.destroy
      redirect_to user_path(current_user.id), notice: "サブスクリプションを利用一覧から外しました"
    elsif params[:back_to_mypage] #共有サブスクリプションは削除しない場合
      redirect_to user_path(current_user.id), notice: "サブスクリプションを利用一覧から外しました"
    else
      redirect_to subscriptions_path, notice: "サブスクリプションを利用一覧から外しました"
    end
  end
end
