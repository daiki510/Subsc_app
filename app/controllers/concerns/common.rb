module Common
  extend ActiveSupport::Concern

  delegate :subscriptions, to: :current_user
end
