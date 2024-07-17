class Api::PostsController < ApplicationController

  def index
    @posts = Post
      .by_params(params)
      .includes(:sub, :user, :votes, comments: [:user, :votes])
    render :index
  end

  def show
    @post = Post
      .with_score
      .includes(:sub, :user, :votes)
      .find(params[:id])

    @comments = Comment.confidence_sorted_by_post(@post)
    ActiveRecord::Associations::Preloader.new.preload(@comments, :user)
    ActiveRecord::Associations::Preloader.new.preload(@comments, :votes)
    render :show
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      current_user.votes.create!(
        votable_id: @post.id,
        votable_type: "Post",
        value: 1
      )
      render :show
    else
      render json: @post.errors.full_messages
    end
  end

  def vote(direction)
    @vote = Post.find_or_create_vote_for_user(current_user, params[:id])
    @vote.value = (@vote.value == direction ? 0 : direction)

    if @vote.save
      @post = Post.with_score.includes(:sub, :user, :votes).find(@vote.votable_id)
      render :show
    else
      render json: @vote.errors.full_messages
    end
  end

  def upvote
    vote(1)
  end

  def downvote
    vote(-1)
  end

  def post_params
    params.require(:post).permit(:title, :body, :sub_id)
  end

end
