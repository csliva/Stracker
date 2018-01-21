defmodule Stracker.Board do
  use Stracker.Web, :model

  schema "boards" do
    field :name, :string
    field :description, :string
    field :slug, :string
    many_to_many :users, Stracker.User, join_through: "user_boards"

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
