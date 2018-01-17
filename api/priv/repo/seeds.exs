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
  Code.load_file "priv/repo/utils.exs"
  alias Stracker.Utils
  alias Stracker.Repo
  alias Stracker.Board
  alias Stracker.User
  alias Stracker.UserBoards
  alias Stracker.Stack
  alias Stracker.Event
  alias Ecto.Changeset

  ##### Test lifecycle ######
  ###########################

  # Create new admin user
  # Create a board for this user
  # Create 4 more users
  # add them to the board
  # Create a stack -> add events, create a stack -> add events

  #############END###########


  def dry_run() do

    Utils.add_user! username: "csliva", email: "csliva@gmail.com", password: "hayden123"

    Utils.add_board! name: "Test board", slug: "test_board", description: "This is my board!"

    Utils.add_user_to_board!("csliva", "test_board")



        Repo.insert! %Stack{
          stack_title: "job1",
          description: "work",
          created_by: "csliva",
          latest_contributor: "csliva"
        }

        Repo.insert! %Event{
          start_time: NaiveDateTime.utc_now(),
          end_time: NaiveDateTime.utc_now(),
        }

  end

end

Stracker.DatabaseSeeder.dry_run()
