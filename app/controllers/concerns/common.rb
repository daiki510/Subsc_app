module Common
  extend ActiveSupport::Concern

  included do
    # ここにcallback等
  end

  delegate :subscriptions, to: :current_user
end
