defmodule Stracker.Post do
  use Stracker.Web, :model

  schema "posts" do
    field :post_title, :string
    field :slug, :string
    field :time, :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:post_title, :slug, :time])
    |> validate_required([:post_title, :slug, :time])
  end
end
