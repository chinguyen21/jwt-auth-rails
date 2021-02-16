class ApplicationController < ActionController::API

  def logged_in?
    headers = request.headers['Authorization']
    token = headers.split(' ')[1]
    user_id = JWT.decode(token, "chinguyen")[0]["user_id"]
    user =  User.find(user_id) 
    user ? user : nil
    render json: { error: 'Please log in' }, status: :unauthorized unless user
  end

end
