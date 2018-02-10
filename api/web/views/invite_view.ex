defmodule Stracker.InviteView do
  use Stracker.Web, :view

  def render("success.json", %{}) do
    # Do nothing to output data to API.
    # This is a simple way to get the server to inspect data without worrying about the view
    %{success: "true"}
  end

end
