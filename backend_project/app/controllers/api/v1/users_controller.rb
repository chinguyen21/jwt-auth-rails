class Api::V1::UsersController < ApplicationController
   before_action :logged_in?, only: [:index]

  def index 
    render json: {status: "Successfully removed token"}
  end

  def create
    # byebug
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: {user: UserSerializer.new(@user)}, status: :created
    else 
      render json: {error: 'failed to create user'}, status: :not_acceptable
    end
  end

  private
  def user_params
    params.permit(:username, :password, :password_confirmation, :bio, :avatar)
  end

end
