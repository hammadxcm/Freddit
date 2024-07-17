# == Schema Information
#
# Table name: votes
#
#  id           :integer          not null, primary key
#  value        :integer          not null
#  user_id      :integer          not null
#  votable_id   :integer
#  votable_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do

  factory :vote do
    value { [1, 1, -1].sample }
    user_id 1
    votable_id 1
    factory :comment_vote do
      votable_type "Comment"
    end
    factory :post_vote do
      votable_type "Post"
    end
  end

end
