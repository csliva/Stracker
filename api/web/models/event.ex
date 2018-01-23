defmodule Stracker.Event do
  use Stracker.Web, :model

  schema "events" do
    field :start_time, :naive_datetime
    field :end_time, :naive_datetime
    belongs_to :task, Stracker.Task
    belongs_to :user, Stracker.User
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:start_time, :end_time, :task_id, :user_id])
  end


end
