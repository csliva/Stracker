defmodule Stracker.InviteController do
  use Stracker.Web, :controller
  alias Stracker.Mailer
  alias Stracker.UserEmail
  alias Stracker.User

  def invite(conn, %{"email" => email}) do
    # check if email exists in DB
    email_query = Repo.one(
      from u in User,
      select: u,
      where: ^email == u.email
    )
    cond do
      email_query == nil -> IO.inspect("User does not exist yet")
      email_query != nil -> IO.inspect("User does exit. Add to board")
      true -> IO.inspect("There is a bug somewhere in InviteController")
    end
    # email is sent from lib/stracker/user_email.ex
    # UserEmail.send_welcome(email) |> Mailer.deliver_now
    render(conn, "success.json", %{})
  end
end
