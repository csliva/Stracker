defmodule Stracker.EventView do
  use Stracker.Web, :view

  def render("index.json", %{events: events}) do
    %{data: render_many(events, Stracker.EventView, "event.json")}
  end

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
      running: event.running,
      total_time: event.total_time,
      created_by_id: event.created_by_id,
      updated_by_id: event.updated_by_id,
      inserted_at: event.inserted_at}
  end

  def render("running.json", %{events: events}) do
    %{data: render_many(events, Stracker.EventView, "running.json")}
  end

  def render("running.json", %{event: event}) do
    %{id: event.id,
      start_time: event.start_time,
      end_time: event.end_time,
      running: event.running,
      total_time: event.total_time,
      task_title: event.task.task_title,
      task_id: event.task.id,
      board_name: event.task.board.name,
      created_by_id: event.created_by_id,
      updated_by_id: event.updated_by_id,
      inserted_at: event.inserted_at}
  end
end
