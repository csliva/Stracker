defmodule Stracker.UserView do
  use Stracker.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Stracker.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, Stracker.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email,
      password_hash: user.password_hash,
      subscriber: user.subscriber,
      name: user.name}
  end
end
