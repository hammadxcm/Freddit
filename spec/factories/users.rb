# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

FactoryBot.define do

  factory :user do
    username { Faker::Internet.username }
    email { Faker::Internet.email }
    password { "password" }
  end

end
