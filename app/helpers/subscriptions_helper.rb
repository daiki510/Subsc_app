module SubscriptionsHelper
  def total_subsc
    Subscription.all.count
  end
end
