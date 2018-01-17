defmodule Stracker.UserBoard do
  use Stracker.Web, :model

  schema "user_boards" do
    belongs_to :user, Stracker.User
    belongs_to :board, Stracker.Board

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :board_id])
    |> validate_required([:user_id, :board_id])
    |> unique_constraint(:user_id_board_id)
  end
end
