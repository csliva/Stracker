defmodule Stracker.InviteController do
  use Stracker.Web, :controller
  alias Stracker.Mailer
  alias Stracker.UserEmail
  alias Stracker.User
  alias Stracker.Invite

  def invite(conn, params) do
    # check if email exists in DB
    email_query = Repo.one(
      from u in User,
      select: u,
      where: ^params["email"] == u.email
    )
    cond do
      is_nil(email_query) -> store_invite(conn, params)
      is_nil(email_query) -> IO.inspect("User does exit. Add to board")
      true -> IO.inspect("There is a bug somewhere in InviteController")
    end
    # email is sent from lib/stracker/user_email.ex
    # UserEmail.send_welcome(email) |> Mailer.deliver_now
    render(conn, "success.json", %{})
  end

  defp store_invite(conn, params) do
    #recipient, board id, sender id
    changeset = Invite.changeset(%Invite{}, params)
    case Repo.insert(changeset) do
      {:ok, invite} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", invite_path(conn, :show, invite))
        |> render("show.json", invite: invite)
      {:error, params} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Stracker.ChangesetView, "error.json", changeset: changeset)
    end
  end


end
