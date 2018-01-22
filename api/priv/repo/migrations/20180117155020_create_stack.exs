defmodule Stracker.Repo.Migrations.CreateStack do
  use Ecto.Migration

  def change do
    create table(:stacks) do
      add :stack_title, :string
      add :description, :string
      add :board_id, references(:boards, on_delete: :nothing), null: false
      timestamps()
    end

  end
end
