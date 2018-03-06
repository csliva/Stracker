defmodule Stracker.BoardView do
  use Stracker.Web, :view

  def render("index.json", %{boards: boards}) do
    %{data: render_many(boards, Stracker.BoardView, "board.json")}
  end

  def render("show.json", %{board: board}) do
    %{data: render_one(board, Stracker.BoardView, "board.json")}
  end

  def render("board.json", %{board: board}) do
    %{id: board.id,
      name: board.name,
      description: board.description}
  end
end
