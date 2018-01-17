defmodule Stracker.BoardController do
  use Stracker.Web, :controller

  alias Stracker.Board

  plug Guardian.Plug.EnsureAuthenticated, handler: Stracker.SessionController

  def index(conn, _params) do
    boards = Repo.all(Board)
    render(conn, "index.json", boards: boards)
  end

  def create(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)
    changeset = Board.changeset(%Board{}, params)

    case Repo.insert(changeset) do
      {:ok, board} ->
        assoc_changeset = Stracker.UserBoard.changeset(
          %Stracker.UserBoard{},
          %{user_id: current_user.id, board_id: board.id}
        )
        Repo.insert(assoc_changeset)

        conn
        |> put_status(:created)
        |> render("show.json", board: board)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def join(conn, %{"id" => board_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    board = Repo.get(Board, board_id)

    changeset = Stracker.UserBoard.changeset(
      %Stracker.UserBoard{},
      %{board_id: board.id, user_id: current_user.id}
    )

    case Repo.insert(changeset) do
      {:ok, _user_board} ->
        conn
        |> put_status(:created)
        |> render("show.json", %{board: board})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
