class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  # deviseコントローラーにストロングパラメータを追加          
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    # 登録時のストロングパラメータを追加
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name,:admin,:notification_status])
    # 編集時のストロングパラメータを追加
    devise_parameter_sanitizer.permit(:account_update, keys: [:name,:admin,:notification_status])
  end

  def after_sign_in_path_for(resource)
    user_path(resource)
  end

  def required_admin
    unless current_user.admin?
      redirect_to user_path(current_user.id),notice: "権限がありません"
    end
  end

  def ensure_correct_user
    @user = User.find(params[:id])
    if current_user.id != @user.id && current_user.admin == false
      redirect_to user_path(current_user.id),notice: "権限がありません"
    end
  end
end
