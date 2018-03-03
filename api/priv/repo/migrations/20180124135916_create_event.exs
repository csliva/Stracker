defmodule Stracker.Repo.Migrations.CreateEvent do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :start_time, :naive_datetime
      add :end_time, :naive_datetime
      add :running, :boolean
      add :task_id, references(:tasks, on_delete: :nothing)
      add :created_by_id, references(:users, on_delete: :nothing)
      add :updated_by_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:events, [:task_id])
    create index(:events, [:created_by_id])

  end
end
