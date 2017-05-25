defmodule Stracker.Post do
  use Stracker.Web, :model

  schema "posts" do
    field :post_title, :string
    field :time, :integer
    field :notes, :string
    field :tags, {:array, :string}
    belongs_to :user, Stracker.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:post_title, :notes, :time, :tags, :user_id])
    |> validate_required([:post_title, :time, :user_id])
  end
end
