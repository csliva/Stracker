defmodule Stracker.Event do
  use Stracker.Web, :model

  schema "events" do
    @primary_key {:id, autogenerate: true}
    field :start_time, Ecto.DateTime
    field :end_time, Ecto.DateTime
    belongs_to :task, Stracker.Task
    belongs_to :user, Stracker.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start_time, :end_time, :user_id, :task_id])
  end
end
