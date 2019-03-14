class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :required_admin, only: [:index]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @subscriptions = @user.added_subscriptions
  end
end
