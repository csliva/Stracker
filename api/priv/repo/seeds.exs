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
  alias Stracker.User

  def insert_post(count) do
    IO.puts(count)
    title = Elixilorem.words 2
    random_number = :rand.uniform(500)
    content = Elixilorem.words 5
    #random_user = :rand.uniform(5)
    random_user = count
    Repo.insert! %Post{
      post_title: title,
      time: random_number,
      notes: content,
      user_id: random_user
    }
  end

  def insert_user(count) do
    changeset = Stracker.User.registration_changeset(%Stracker.User{}, %{
      username: "demo#{count}",
      email: "demo#{count}@gmail.com",
      password: "demo123"
    })
    Stracker.Repo.insert(changeset)
  end

  def add_100_posts(count) do
    (1..100) |> Enum.each(fn _ -> Stracker.DatabaseSeeder.insert_post(count) end)
  end

  def clear do
    Repo.delete_all
  end
end

(1..1000) |> Enum.each(fn(count) -> Stracker.DatabaseSeeder.add_100_posts(count) end)
#fn _ -> Stracker.DatabaseSeeder.clear end
