defmodule Stracker.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :task_title, :string
      add :description, :string
      add :board_id, references(:boards, on_delete: :nothing), null: false
      timestamps()
    end

  end
end
