defmodule Stracker.Repo.Migrations.CreatePost do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :post_title, :string
      add :time, :integer
      add :notes, :string
      add :user_id, references(:users), null: false

      timestamps()
    end

  end
end
