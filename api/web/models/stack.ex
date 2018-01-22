defmodule Stracker.Stack do
  use Stracker.Web, :model

  schema "stacks" do
    @primary_key {:id, autogenerate: true}
    field :stack_title, :string
    field :description, :string
    belongs_to :board, Stracker.Board
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:stack_title, :description, :board_id])
    |> validate_required([:stack_title])
  end
end
