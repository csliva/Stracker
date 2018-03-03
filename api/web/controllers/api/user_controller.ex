defmodule Stracker.UserController do
  use Stracker.Web, :controller

  alias Stracker.User

  plug Guardian.Plug.EnsureAuthenticated, [handler: Stracker.SessionController] when action in [:boards]

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def create(conn, params) do
    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render(Stracker.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end

  def get_board_users(conn, %{"board_id" => board_id}) do
    #GET: user_ids where board_id is param value
    users = Repo.all(
      from u in User,
      join: b in assoc(u, :boards),
      where: ^board_id == b.id,
      select: u
    )
    render(conn, "board_users.json", users: users)
  end

  def boards(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    boards = Repo.all(assoc(current_user, :boards))
    render(conn, Stracker.BoardView, "index.json", %{boards: boards})
  end

end
