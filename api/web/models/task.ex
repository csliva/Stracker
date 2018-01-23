defmodule Stracker.Task do
  use Stracker.Web, :model

  schema "tasks" do
    field :task_title, :string
    field :description, :string
    belongs_to :board, Stracker.Board
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:task_title, :description, :board_id])
    |> validate_required([:task_title])
  end
end
