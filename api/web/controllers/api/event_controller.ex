defmodule Stracker.EventController do
  use Stracker.Web, :controller

  alias Stracker.Event

  # New event
  def create(conn, _params) do
    changeset = Event.changeset(%Event{}, _params)
    case Repo.insert(changeset) do
      {:ok, event} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", event_path(conn, :show, event))
        |> render("show.json", event: event)
      {:error, params} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def add_date(conn, params) do
    #Set event changeset with params
    changeset = Event.changeset(%Event{}, params)
    # get latest event or fail
    # use --- Ecto.DateTime.utc
    # Repo.insert_or_update!(changeset)
    case Event |> last(:inserted_at) |> Repo.one do
      nil -> IO.puts "build the model here"
      _ -> IO.puts "this is another solution"
    end
    conn
    |> put_status(:unprocessable_entity)
    |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    #add one side or the other to the latest date
    # insert_or_update!(changeset, opts)
  end

 #%Stracker.Event{id: _, start_time: _, end_time: _, user_id: _, task_id: _}

  def index(conn, _params) do
    events = Repo.all(Event)
    render(conn, "index.json", events: events)
  end

  def show(conn, %{"id" => id}) do
    event = Repo.get!(Event, id)
    render(conn, "show.json", event: event)
  end

  def get_by_task(conn, %{"task_id" => task_id}) do
    events = Repo.all(
      from p in Event,
      select: p,
      where: ^task_id == p.task_id,
      order_by: [desc: p.updated_at]
    )
    render(conn, "index.json", events: events)
  end

  # Update will be needed later....

  def delete(conn, %{"id" => id}) do
    event = Repo.get!(Event, id)

    Repo.delete!(event)

    send_resp(conn, :no_content, "")
  end
end
