defmodule Stracker.Repo.Migrations.CreateInvite do
  use Ecto.Migration

  def change do
    create table(:invites) do
      add :recipient, :string
      add :board_id, references(:boards, on_delete: :nothing)
      add :sender_id, references(:users, on_delete: :nothing)

      timestamps()
    end
  end
end
