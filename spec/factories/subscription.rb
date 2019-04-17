FactoryBot.define do
  factory :subscription do
    charge { '1000' }
    due_date { '1' }
    note { 'this is test note' }
    user
    service
  end
end
