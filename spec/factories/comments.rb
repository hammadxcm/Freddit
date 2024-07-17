# == Schema Information
#
# Table name: comments
#
#  id                :integer          not null, primary key
#  body              :text             not null
#  user_id           :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  post_id           :integer          not null
#  parent_comment_id :integer
#

FactoryGirl.define do

  factory :comment do
    body { [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample }
    user_id 1
    post_id 1
  end
end
