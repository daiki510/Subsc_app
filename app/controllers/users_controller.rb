class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @subscriptions = @user.added_subscriptions
    # @detail = Detail.find_by(user_id: current_user.id, subscription_id: subscription.id)
    # raise
  end

  # def detail(subscription)
  #   current_user.detailed_subscriptions.find_by(id: subscription.id)
  # end
end
