alias Stracker.Repo
alias Stracker.Board
alias Stracker.User
alias Stracker.UserBoards
alias Stracker.Stack
alias Stracker.Event
alias Ecto.Changeset

defmodule Stracker.Utils do
  def fresh_start!() do
    Repo.delete_all(Board)
    Repo.delete_all(User)
    Repo.delete_all(UserBoards)
    Repo.delete_all(Stack)
    Repo.delete_all(Event)
  end

  def add_user!(kwlist) do
    User.registration_changeset(%Stracker.User{},as_map(kwlist))
    |> Repo.insert!
  end

  def add_board!(kwlist), do: add_x!(Board, kwlist)

  def add_user_to_board!(username, board_slug) do

    user =
      existing_user(username)

    board = Repo.get_by(Board, slug: board_slug)

    Repo.preload(user, :boards)

    Changeset.change(user)
    |> Changeset.put_assoc(:boards, board.id)
    |> Repo.update

    Repo.insert!(%UserBoards{users: user.id,
                             boards: board.id })
  end

  defp existing_user(username), do: Repo.get_by(User, username: username)

  defp add_x!(module, kwlist), do: struct(module, as_map(kwlist)) |> Repo.insert!

  defp as_map(kwlist), do: Enum.into(kwlist, %{})
end
