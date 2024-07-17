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

class Comment < ActiveRecord::Base
  include Votable

  validates :body, :user_id, :post_id, presence: true

  belongs_to :comment
  belongs_to :post
  belongs_to :user
  has_many :votes, as: :votable
  has_many :child_comments, class_name: "Comment", foreign_key: :parent_comment_id

  def self.confidence_sort(comments)
    comments.sort_by do |comment|
      num_ratings = comment.positive + comment.negative

      if num_ratings == 0
          0
      else
        z = 1.281551565545 # 80% confidence
        ups_over_total = comment.positive.to_f / num_ratings

        left = ups_over_total + 1 / (2 * num_ratings) * z * z
        right = z * Math.sqrt(ups_over_total * (1 - ups_over_total) / num_ratings + z * z /(4 * num_ratings * num_ratings))
        under = 1 + 1 / num_ratings * z * z

        (left - right) / under
      end
    end
  end

  def self.confidence_sorted_by_post(post)
    comments = self.find_by_sql(<<-SQL)
      SELECT
        comments.*,
        COUNT(positive) AS positive,
        COUNT(negative) AS negative,
        (COUNT(positive) - COUNT(negative)) AS score
      FROM
        comments
      LEFT OUTER JOIN
        (
          SELECT
            votes.*
          FROM
            votes
          WHERE
            votes.value = 1
        ) AS positive
      ON
        positive.votable_id = comments.id
      AND
        positive.votable_type = 'Comment'
      LEFT OUTER JOIN
        (
          SELECT
            votes.*
          FROM
            votes
          WHERE
            votes.value = -1
        ) AS negative
      ON
        negative.votable_id = comments.id
      AND
        negative.votable_type = 'Comment'
      WHERE
        comments.post_id = #{post.id}
      GROUP BY
        comments.id
    SQL
    confidence_sort(comments)
  end

end
