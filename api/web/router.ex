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
    resources "/tasks", TaskController
    patch "/tasks/:id", TaskController, :update
    get "/tasks/board/:board_id", TaskController, :get_by_board
    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    get "/users/:id/boards", UserController, :boards
    resources "/boards", BoardController, only: [:index, :create]
    post "/board/:id/join", BoardController, :join
    # get task events by task id
    get "/task/events/:task_id", EventController, :get_by_task
    resources "/events", EventController
    get "/read_last", EventController, :read_last
    post "add_event/:user_id/:task_id", EventController, :add_entry
  end
end
