defmodule Stracker.User do
  use Stracker.Web, :model

  schema "users" do
    field :username, :string
    field :email, :string
    field :password_hash, :string
    field :subscriber, :boolean, default: false
    field :name, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email, :password_hash, :subscriber, :name])
    |> validate_required([:username, :email, :password_hash, :subscriber, :name])
  end
end
