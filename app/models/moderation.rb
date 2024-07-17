# == Schema Information
#
# Table name: moderations
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  sub_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Moderation < ActiveRecord::Base
  belongs_to :user
  belongs_to :sub
end
