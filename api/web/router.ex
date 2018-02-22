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
    patch "/tasks/:id", TaskController, :update
    get "/tasks/board/:board_id", TaskController, :get_by_board
    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    delete "/tasks/:id", TaskController, :delete
    post "/sessions/refresh", SessionController, :refresh
    get "/users/:id/boards", UserController, :boards
    post "/board/:id/join", BoardController, :join
    get "/board/:board_id", BoardController, :get_board
    get "/task/:task_id/events", EventController, :get_by_task
    post "/add_event/:user_id/:task_id", EventController, :add_entry
    resources "/boards", BoardController, only: [:index, :create]
    resources "/events", EventController
    resources "/tasks", TaskController
    resources "/invite", InviteController, only: [:index, :show]
    post "/invite", InviteController, :invite
  end
end
