class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  # deviseコントローラーにストロングパラメータを追加          
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    # 登録時にnameのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name,:admin])
    # 編集時にnameのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:account_update, keys: [:name,:admin])
  end

  def after_sign_in_path_for(resource)
    subscriptions_path
  end

  def required_admin
    unless current_user.admin?
      redirect_to user_path(current_user.id),notice: "権限がありません"
    end
  end

  def ensure_correct_user
    @user = User.find(params[:id])
    if current_user.id != @user.id
      redirect_to user_path(current_user.id),notice: "権限がありません"
    end
  end
end
