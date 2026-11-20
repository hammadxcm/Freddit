class Api::SubsController < ApplicationController

  def index
    @subs = Sub.all
    render :index
  end

  def show
    @sub = Sub.find_by(title: params[:id])
    @posts = @sub
      .posts
      .by_params(params.permit(:sort, :order, :page, :hours, :days).to_h)
      .includes(:user, :votes, comments: [:votes, { user: :votes }]
    )
    render :show
  end

end
