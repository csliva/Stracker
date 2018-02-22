defmodule Stracker.Invite do
  use Stracker.Web, :model

  # Invites between one board user to another

  schema "invites" do
    belongs_to :board, Stracker.Board
    belongs_to :sender, Stracker.User
    field :recipient, :string
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    IO.inspect params
    struct
    |> cast(params, [:id, :board_id, :sender_id, :recipient])
    |> validate_required([:board_id, :sender_id, :recipient])
  end
end
