defmodule Stracker.CsvController do
  use Stracker.Web, :controller

  alias Stracker.Board

  # plug Guardian.Plug.EnsureAuthenticated, handler: Stracker.SessionController

  def export(conn, %{"board_id" => board_id}) do

    #set headers
    conn =
      conn
      |> put_resp_header("content-disposition", "attachment; filename=query.csv")
      |> put_resp_content_type("text/csv")
      |> send_chunked(200)

      #Reduce while to keep reducing while stream is open
    Repo.transaction(fn -> build_export_query(board_id)
      |> Enum.reduce_while(conn, fn (data, conn) ->
        case chunk(conn, data) do
          {:ok, conn} -> {:cont, conn}
          {:error, :closed} -> {:halt, conn}
        end
      end )
    end )
    # return the connection
    conn
  end

  def build_export_query(board_id, batch_size \\ 500) do
    columns = ~w(ls task_title )
  query = """
    COPY (
    select events.start_time, events.end_time, tasks.task_title from events
    inner join tasks on events.task_id = tasks.id
    where tasks.board_id = #{board_id}
    ) to STDOUT WITH CSV DELIMITER ',';
    """

    csv_header = [Enum.join(columns, ","), "\n"]

    Ecto.Adapters.SQL.stream(Repo, query, [], max_rows: batch_size)
    |> Stream.map(&(&1.rows))
    |> (fn stream -> Stream.concat(csv_header, stream) end).()
  end

end
