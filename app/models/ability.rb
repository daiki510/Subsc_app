class Ability
  include CanCan::Ability

  def initialize(user)
    if user.admin?
      can :access, :rails_admin
      can :manage, :all
    end
  end
end