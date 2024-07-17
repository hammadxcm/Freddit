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

class Vote < ActiveRecord::Base
  validates :votable, :user, :value, presence: true
  validates :user_id, :uniqueness => { :scope => [:votable_type, :votable_id] }

  after_initialize :ensure_value

  belongs_to :user
  belongs_to :votable, polymorphic: :true

  def upvote
    value = 1
  end

  def downvote
    value = -1
  end

  private

  def ensure_value
    value ||= 0
  end


end
