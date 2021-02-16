class Api::V1::AuthController < ApplicationController

  def login
    @user = User.find_by(username: user_login_params[:username])
    if @user && @user.authenticate(user_login_params[:password])
      token = JWT.encode({ user_id: @user.id }, "chinguyen")
      render json: { users: UserSerializer.new(@user), token: token }, status: :accepted
    else
      render json: { message: 'Invalid username or password'}, status: :unauthorized
    end
  end

  private

  def user_login_params
    params.permit(:username, :password)
  end
end
