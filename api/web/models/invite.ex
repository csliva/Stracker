defmodule Stracker.Invite do
  use Stracker.Web, :model

  # Invites between one board user to another

  schema "invites" do
    belongs_to :user_board, Stracker.UserBoard
    belongs_to :sender, Stracker.User
    belongs_to :recipient, Stracker.User
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :user_board, :sender, :recipient])
  end
end
