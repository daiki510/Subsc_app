class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :required_admin, only: [:index]
  before_action :ensure_correct_user, only: [:show]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @subscriptions = @user.added_subscriptions
    @details = @user.details

    #検索機能
    @subscriptions = @subscriptions.where(['name LIKE ?', "%#{params[:search]}%"]) if params[:search]
  end
end
