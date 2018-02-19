defmodule Stracker.InviteView do
  use Stracker.Web, :view

  def render("success.json", %{}) do
    # Do nothing to output data to API.
    # This is a simple way to get the server to inspect data without worrying about the view
    %{success: "true"}
  end
  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, Stracker.InviteView, "invite.json")}
  end
  def render("invite.json", %{invite: invite}) do
    %{id: invite.id,
      board_id: invite.board_id,
      sender_id: invite.sender_id,
      recipient: invite.recipient}
  end

end
