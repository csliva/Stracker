# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Stracker.Repo.insert!(%Stracker.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Stracker.DatabaseSeeder do
  alias Stracker.Repo
  alias Stracker.Post

  def insert_post do
    title = Elixilorem.words 2
    random_number = :rand.uniform(500)
    content = Elixilorem.words 5
    random_user = :rand.uniform(3)
    Repo.insert! %Post{
      post_title: title,
      time: random_number,
      notes: content,
      user_id: random_user
    }
  end

  def clear do
    Repo.delete_all
  end
end

(1..100) |> Enum.each(fn _ -> Stracker.DatabaseSeeder.insert_post end)
#fn _ -> Stracker.DatabaseSeeder.clear end
