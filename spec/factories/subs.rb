# == Schema Information
#
# Table name: subs
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do

  factory :sub do
    title { [Faker::Hipster.word, Faker::Hacker.noun].sample }
    description { [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample }
  end
end
