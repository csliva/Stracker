defmodule Stracker.InviteController do
  use Stracker.Web, :controller
  alias Stracker.Mailer
  alias Stracker.UserEmail

  def invite(conn, %{"email" => email}) do
    UserEmail.send_welcome(email) |> Mailer.deliver_now
    render(conn, "success.json", %{})
  end
end
