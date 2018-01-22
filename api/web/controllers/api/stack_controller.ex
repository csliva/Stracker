defmodule Stracker.StackController do
  use Stracker.Web, :controller

  alias Stracker.Stack

  def create(conn, params) do
    changeset = Stack.changeset(%Stack{}, params)
    case Repo.insert(changeset) do
      {:ok, stack} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", stack_path(conn, :show, stack))
        |> render("show.json", stack: stack)
      {:error, params} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def index(conn, _params) do
    stacks = Repo.all(Stack)
    render(conn, "index.json", stacks: stacks)
  end

  def show(conn, %{"id" => id}) do
    stack = Repo.get!(Stack, id)
    render(conn, "show.json", stack: stack)
  end

  def get_by_board(conn, %{"board_id" => board_id}) do
    stacks = Repo.all(
      from p in Stack,
      select: p,
      where: ^board_id == p.board_id,
      order_by: [desc: p.updated_at]
    )
    render(conn, "index.json", stacks: stacks)
  end

  def update(conn, params) do
    stack = Repo.get!(Stack, params["id"])
    changeset = Stack.changeset(stack, params["stack_params"])

    case Repo.update(changeset) do
      {:ok, stack} ->
        render(conn, "show.json", stack: stack)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    stack = Repo.get!(Stack, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(stack)

    send_resp(conn, :no_content, "")
  end
end
