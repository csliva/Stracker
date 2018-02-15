defmodule Stracker.TaskController do
  use Stracker.Web, :controller

  alias Stracker.Task

  def create(conn, params) do
    changeset = Task.changeset(%Task{}, params)
    case Repo.insert(changeset) do
      {:ok, task} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", task_path(conn, :show, task))
        |> render("show.json", task: task)
      {:error, params} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def index(conn, _params) do
    tasks = Repo.all(Task)
    render(conn, "index.json", tasks: tasks)
  end

  def show(conn, %{"id" => id}) do
    task = Repo.get!(Task, id)
    render(conn, "show.json", task: task)
  end

  def get_by_board(conn, %{"board_id" => board_id}) do
    tasks = Repo.all(
      from p in Task,
      select: p,
      where: ^board_id == p.board_id,
      order_by: [desc: p.updated_at]
    )
    render(conn, "index.json", tasks: tasks)
  end

  def update(conn, params) do
    task = Repo.get!(Task, params["id"])
    changeset = Task.changeset(task, params["task_params"])

    case Repo.update(changeset) do
      {:ok, task} ->
        render(conn, "show.json", task: task)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Repo.get!(Task, id)

    Repo.delete!(task)

    send_resp(conn, :no_content, "")
  end
end
