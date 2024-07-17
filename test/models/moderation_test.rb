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

require 'test_helper'

class ModerationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
