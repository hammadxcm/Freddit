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

class Sub < ActiveRecord::Base
  has_attached_file(
    :bg_image,
    styles: { medium: "300x300>", thumb: "100x100>" }
  )
  validates_attachment(
    :bg_image,
    content_type: {
      content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"]
    }
  )

  validates :title, :description, presence: true
  validates :title, uniqueness: true

  has_many :posts

  has_many :moderations

  has_many(
    :moderators,
    through: :moderations,
    source: :user
  )

end
