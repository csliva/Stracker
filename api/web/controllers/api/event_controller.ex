defmodule Stracker.EventController do
  use Stracker.Web, :controller

  alias Stracker.Event

# fetch events belonging to a stack

  def index(conn, _params) do
    events = Repo.all(Event)
    render(conn, "index.json", events: events)
  end

# close event if ongoing. Else, new event
#$query = 'SELECT * FROM `table` ORDER BY `date` DESC LIMIT 1';
#Repo.one(from x in MyApp.Model, order_by: [desc: x.id], limit: 1)
  def get_by_stack(conn, %{"stack_id" => stack_id}) do
    events = Repo.all(
      from p in Event,
      select: p,
      where: ^stack_id == p.stack_id,
      order_by: [desc: p.updated_at],
      limit: 1
    )
    render(conn, "index.json", events: events)
  end

end
