module Common
  extend ActiveSupport::Concern

  included do
  end

  delegate :subscriptions, to: :current_user
end
