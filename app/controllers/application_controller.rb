class ApplicationController < ActionController::Base
  # deviseコントローラーにストロングパラメータを追加
  before_action :configure_permitted_parameters, if: :devise_controller?

  # # 例外処理
  # rescue_from ActiveRecord::RecordNotFound, with: :render_404
  # rescue_from ActionController::RoutingError, with: :render_404
  # rescue_from Exception, with: :render_500

  # def render_404
  #   render template: 'errors/error_404', status: :not_found, layout: 'application', content_type: 'text/html'
  # end

  # def render_500
  #   render template: 'errors/error_500', status: :internal_server_error, layout: 'application', content_type: 'text/html'
  # end

  protected

  def configure_permitted_parameters
    # 登録時のストロングパラメータを追加
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name admin notification_status])
    # 編集時のストロングパラメータを追加
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name admin notification_status])
  end

  def after_sign_in_path_for(resource)
    user_path(resource)
  end

  def after_sign_out_path_for(_resource)
    flash[:alert] = 'ログアウトしました'
    root_path
  end

  def required_admin
    redirect_to user_path(current_user.id), notice: '権限がありません' unless current_user.admin?
  end

  def required_creator
    service = Service.find(params[:id])
    redirect_to user_path(current_user.id), notice: '権限がありません' if current_user.id != service.user_id
  end

  def ensure_correct_user
    @user = User.find(params[:id])
    redirect_to user_path(current_user.id), notice: '権限がありません' if current_user.id != @user.id && current_user.admin == false
  end
end
