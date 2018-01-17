defmodule Stracker.Router do
  use Stracker.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Stracker do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/posts", PostController
    get "/posts/user/:user_id", PostController, :get_by_user
    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    get "/users/:id/boards", UserController, :boards
    resources "/bords", BoardController, only: [:index, :create]
    post "/board/:id/join", BoardController, :join
  end
end
