defmodule Stracker.Stack do
  use Stracker.Web, :model

  schema "stacks" do
    @primary_key {:id, autogenerate: true}
    field :stack_title, :string
    field :description, :string
    field :created_by, :string
    field :latest_contributor, :string
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:stack_title, :description])
    |> validate_required([:stack_title])
  end
end
