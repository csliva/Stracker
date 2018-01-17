defmodule Stracker.Event do
  use Stracker.Web, :model

  schema "events" do
    field :start_time, :naive_datetime
    field :end_time, :naive_datetime
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start_time, :end_time])
  end
end
