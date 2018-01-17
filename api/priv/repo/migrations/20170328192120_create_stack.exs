defmodule Stracker.Repo.Migrations.CreateStack do
  use Ecto.Migration

  def change do
    create table(:stacks) do
      add :stack_title, :string
      add :description, :string
      add :created_by, :string
      add :latest_contributor, :string
      timestamps()
    end

  end
end
