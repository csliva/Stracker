defmodule Stracker.Repo.Migrations.CreatePost do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :post_title, :string
      add :slug, :string
      add :time, :integer

      timestamps()
    end

  end
end
