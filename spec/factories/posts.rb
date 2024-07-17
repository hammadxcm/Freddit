# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  sub_id     :integer          not null
#  title      :string           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  url        :string
#  deleted    :boolean          default(FALSE), not null
#

FactoryGirl.define do

  factory :post do
    title { ["#{Faker::Hacker.noun} #{Faker::Hacker.ingverb}", Faker::Hipster.sentence].sample }
    body { [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample }
    user_id 1
    sub_id 1
  end
end
