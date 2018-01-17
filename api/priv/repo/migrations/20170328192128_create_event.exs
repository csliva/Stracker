defmodule Stracker.Repo.Migrations.CreateEvent do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :start_time, :naive_datetime
      add :end_time, :naive_datetime
    end

  end
end
