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

  def read_last(conn, %{"user_id" => user_id}) do
    #Set event changeset with params
    changeset = Event.changeset(%Event{})
    # get latest event or fail
    # use --- Ecto.DateTime.utc
    # Repo.insert_or_update!(changeset)
    events = Repo.all(
      from e in Event,
      select: e,
      where: ^1 == e.user_id,
      order_by: [desc: e.updated_at],
      limit: 1
    )

    conn
    |> put_status(:accepted)
    |> render(Stracker.ChangesetView, "test.json", changeset: changeset)
    #add one side or the other to the latest date
    # insert_or_update!(changeset, opts)
  end

  def add_entry(conn, %{"user_id" => user_id, "task_id" => task_id}) do
    events = Repo.all(
      from e in Event,
      select: e,
      where: ^task_id == e.task_id and ^user_id == e.user_id,
      order_by: [desc: e.updated_at],
      limit: 1
    )

    end_time = nil
    event_id = nil
    Enum.map(events, fn(x) ->
      event_id = x.id
      end_time = x.end_time
    end)
    IO.inspect event_id
    cond do
      events == [] ->
        add_row(conn, events, Event.changeset(%Event{}, %{start_time: Ecto.DateTime.utc, user_id: user_id, task_id: task_id}))
      end_time == nil ->
        add_endtime(conn, events, Event.changeset(%Event{}, %{id: event_id, end_time: Ecto.DateTime.utc}))
      end_time != nil ->
        add_row(conn, events, Event.changeset(%Event{}, %{start_time: Ecto.DateTime.utc, user_id: user_id, task_id: task_id}))
    end
  end

  #### THESE FUNCTIONS ARE USED ONLY IN add_entry
  defp add_row(conn, event,changeset) do
    IO.inspect(changeset)
    case Repo.insert!(changeset) do
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
  defp add_endtime(conn, event, changeset) do
    IO.inspect event
    case Repo.update!(changeset) do
      {:ok, event} ->
        render(conn, "show.json", event: event)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
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
