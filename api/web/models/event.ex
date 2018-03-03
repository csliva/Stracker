defmodule Stracker.Event do
  use Stracker.Web, :model

  schema "events" do
    @primary_key {:id, autogenerate: true}
    field :start_time, Ecto.DateTime
    field :end_time, Ecto.DateTime
    field :running, :boolean
    belongs_to :task, Stracker.Task
    belongs_to :created_by, Stracker.User
    belongs_to :updated_by, Stracker.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :start_time, :end_time, :running,  :task_id, :created_by_id, :updated_by_id])
  end
end
