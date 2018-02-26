defmodule Stracker.EventView do
  use Stracker.Web, :view

  def render("index.json", %{events: events}) do
    %{data: render_many(events, Stracker.EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, Stracker.EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{id: event.id,
      start_time: event.start_time,
      end_time: event.end_time,
      user_id: event.user_id,
      inserted_at: event.inserted_at}
  end
end
