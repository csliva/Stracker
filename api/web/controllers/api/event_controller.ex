defmodule Stracker.EventController do
  use Stracker.Web, :controller


  alias Stracker.Event

  def add_entry(conn, %{"user_id" => user_id, "task_id" => task_id}) do
    last_event = Repo.all(
      from e in Event,
      select: e,
      where: ^task_id == e.task_id and ^user_id == e.user_id,
      order_by: [desc: e.updated_at],
      limit: 1
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
            # apply change to row
            changeset = Event.changeset(event, %{"end_time" => Ecto.DateTime.utc})
            # apply change
            case Repo.update(changeset) do
              # if it works render the result, if not throw api error
              {:ok, event} ->
                render(conn, "show.json", event: event)
              {:error, changeset} ->
                conn
                |> put_status(:unprocessable_entity)
                |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
            end
          # default action, previous event exists with filled in end_time
          true ->
            ####### ADDING A NEW EVENT ROW ##########
            changeset = Event.changeset(%Event{},
              %{ "start_time" => Ecto.DateTime.utc, "user_id" => user_id, "task_id" => task_id})
            case Repo.insert(changeset) do
              {:ok, event} ->
                conn
                |> put_status(:created)
                |> put_resp_header("location", event_path(conn, :show, event))
                |> render("show.json", event: event)
              {:error} ->
                conn
                |> put_status(:unprocessable_entity)
                |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
            end
        end
      :error ->
        # Nothing exists yet. We need to create the first row
        changeset = Event.changeset(%Event{},
          %{
            "start_time" => Ecto.DateTime.utc,
            "user_id" => user_id,
            "task_id" => task_id
          })
        case Repo.insert(changeset) do
          {:ok, event} ->
            conn
            |> put_status(:created)
            |> put_resp_header("location", event_path(conn, :show, event))
            |> render("show.json", event: event)
          {:error} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
        end
    end
  end

  def get_by_task(conn, %{"user_id" => user_id, "task_id" => task_id}) do
    events = Repo.all(
      from p in Event,
      select: p,
      where: ^task_id == e.task_id and ^user_id == e.user_id,
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
