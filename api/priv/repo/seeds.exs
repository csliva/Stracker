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

  ##### Test lifecycle ######
  ###########################

  # Create new admin user
  # Create a board for this user
  # Create 4 more users
  # add them to the board
  # Create a stack -> add events, create a stack -> add events

  #############END###########


  def dry_run() do

    IO.puts("no seeds needed at this time")

  end

end

Stracker.DatabaseSeeder.dry_run()
