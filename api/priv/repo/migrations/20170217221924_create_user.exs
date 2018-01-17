defmodule Stracker.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :subscriber, :boolean, default: false, null: false
    end

    create unique_index(:users, [:username])
    create unique_index(:users, [:email])
  end
end
