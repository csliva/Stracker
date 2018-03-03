defmodule Stracker.EventController do
  use Stracker.Web, :controller


  alias Stracker.Event
  alias Stracker.Task

  def add_entry(conn, %{"user_id" => user_id, "task_id" => task_id}) do
    IO.inspect user_id
    last_event = Repo.all(
      from e in Event,
      select: e,
      where: ^task_id == e.task_id and ^user_id == e.updated_by_id,
      order_by: [desc: e.updated_at],
      limit: 1,
      preload: [:task]
    )
    # Get our model from event.
    case Enum.fetch(last_event,0) do
      # pattern match, last event does exist
      {:ok, event_model} ->
        cond do
          # check to see if end time exists in row
          event_model.end_time == nil ->
            ###### UPDATE ROW #######
            # get our row by id
            event = Repo.get!(Event, event_model.id)
            task = Repo.get!(Task, task_id)

            #SQL to updated `updated at`
            query = "UPDATE tasks SET updated_at = now() at time zone 'utc' where id = $1"
            Ecto.Adapters.SQL.query(Repo, query, [String.to_integer(task_id)]) |> IO.inspect

            # apply change to row
            changeset = Event.changeset(event,
              %{
                "end_time" => Ecto.DateTime.utc(:sec),
                "running" => false,
                "updated_by" => user_id
              })
            # apply change
            case Repo.update(changeset) do
              # if it works render the result, if not throw api error
              {:ok, event} ->
                render_events_success(conn, task_id)
              {:error, changeset} ->
                add_event_error(conn, changeset)
            end
          # default action, previous event exists with filled in end_time
          true ->
            IO.puts("_*_*_*_*_*_*_*")
            IO.inspect(user_id)
            IO.puts("_*_*_*_*_*_*_*")
            ####### ADDING A NEW EVENT ROW ##########
            changeset = Event.changeset(%Event{},
              %{
                "start_time" => Ecto.DateTime.utc(:sec),
                "updated_by_id" => user_id,
                "created_by_id" => user_id,
                "task_id" => task_id,
                "running" => true
              })
              case Repo.insert(changeset) do
                {:ok, _} -> render_events_success(conn, task_id)
                {:error} -> add_event_error(conn, changeset)
              end
        end
      :error ->
        # Nothing exists yet. We need to create the first row
        changeset = Event.changeset(%Event{},
          %{
            "start_time" => Ecto.DateTime.utc(:sec),
            "created_by_id" => user_id,
            "updated_by_id" => user_id,
            "task_id" => task_id,
            "running" => true
          })
          case Repo.insert(changeset) do
            {:ok, _} -> render_events_success(conn, task_id)
            {:error} -> add_event_error(conn, changeset)
          end
    end
  end

  defp render_events_success(conn, task_id) do
    events = Repo.all(
      from e in Event,
      select: e,
      where: ^task_id == e.task_id,
      order_by: [desc: e.updated_at]
    )
    render(conn, "index.json", events: events)
  end

  defp add_event_error(conn, changeset) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
  end

  def get_by_task(conn, %{"task_id" => task_id}) do
    events = Repo.all(
      from e in Event,
      select: e,
      where: ^task_id == e.task_id,
      order_by: [desc: e.updated_at]
    )
    render(conn, "index.json", events: events)
  end

  #def get_running_timers(conn, %{"" => x}) do
  #
  #end

  # Update will be needed later....

  def delete(conn, %{"id" => id}) do
    event = Repo.get!(Event, id)

    Repo.delete!(event)

    send_resp(conn, :no_content, "")
  end
end
