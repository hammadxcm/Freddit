class Api::SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:email],
      params[:user][:password],
    )

    if user
      sign_in!(user)
      render json: user
    else
      render json: ["Invalid log in credentials"], status: 422
    end
  end

  def show
    render json: current_user
  end

  def destroy
    sign_out! if signed_in?
    render json: ["successfly logged out"]
  end

end
