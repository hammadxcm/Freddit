module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable
  end

  def score
    attributes["score"] || votes.pluck(:value).inject(&:+) || 0
  end

  module ClassMethods

    def find_or_create_vote_for_user(user, id)
      user.votes.find_or_create_by(
        votable_id: id,
        votable_type: self.name
      )
    end

  end

end
