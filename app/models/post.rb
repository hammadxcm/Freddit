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

# SELECT
#   posts.*, SUM(votes.value) AS score
# FROM
#   "posts"
# LEFT OUTER JOIN
#   votes ON votes.votable_id = posts.id AND votes.votable_type = 'Post'
# WHERE
#   ("posts"."created_at" BETWEEN '2016-03-11 22:45:53.986652' AND '2016-03-12 22:45:53.986682')
# GROUP BY
#   "posts"."id"
# ORDER BY
#   (LOG(GREATEST(ABS(SUM(votes.value)), 1), 10) * SIGN(SUM(votes.value))) + ((EXTRACT(epoch from posts.created_at) - 1457822407) / 45000) DESC
# LIMIT
#   25
# OFFSET
#   0


class Post < ActiveRecord::Base
  include Votable
  validates :user, :sub, :title, :body, presence: true

  belongs_to :user
  belongs_to :sub
  has_many :comments
  has_many :votes, as: :votable


  def self.with_score
    join_string = "LEFT OUTER JOIN votes ON votes.votable_id = posts.id"
    join_string += " AND votes.votable_type = 'Post'"

    posts = self
    .joins(join_string)
    .select("posts.*, SUM(votes.value) AS score")
    .group(:id)
  end

  def self.by_params(params = {})
    params = {
      sort: "hot",
      order: "num_posts",
      page: "1",
    }.merge(params)

    posts = with_score
    posts = by_time(posts, params)
    posts = by_order(posts, params)

    posts.page(params[:page].to_i)
  end

  def self.by_order(posts, params)
    case params[:sort]
    when "top"
      posts.order("SUM(votes.value) DESC")
    when "new"
      posts.order("created_at DESC")
    when "hot"
      posts.order(<<-SQL)
        ( LOG(GREATEST(ABS(SUM(votes.value)), 1)) * SIGN(SUM(votes.value)) )
      + ( (EXTRACT(epoch from posts.created_at) - 1457822407) / 45000) DESC
      SQL
    end
  end

  def self.by_time(posts, params)
    if params[:hours]
      posts
        .where(created_at: (Time.now - params[:hours].to_i.hours)..Time.now)
    elsif params[:days]
      posts
        .where(created_at: (Time.now - params[:days].to_i.days)..Time.now)
    else
      posts
    end
  end

end
