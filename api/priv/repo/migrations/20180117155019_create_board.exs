defmodule Stracker.Repo.Migrations.CreateBoard do
  use Ecto.Migration

  def change do
    create table(:boards) do
      add :name, :string
      add :description, :string
      add :slug, :string

      timestamps()
    end

    create unique_index(:boards, [:name])
  end
end
