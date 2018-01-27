defmodule Stracker.ChangesetView do
  use Stracker.Web, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `Stracker.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{errors: translate_errors(changeset)}
  end

  def render("test.json", %{changeset: changeset}) do
    # Do nothing to output data to API.
    # This is a simple way to get the server to inspect data without worrying about the view
    %{test: "good"}
  end
end
