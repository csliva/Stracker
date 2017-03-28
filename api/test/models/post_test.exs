defmodule Stracker.PostTest do
  use Stracker.ModelCase

  alias Stracker.Post

  @valid_attrs %{post_title: "some content", slug: "some content", time: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Post.changeset(%Post{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Post.changeset(%Post{}, @invalid_attrs)
    refute changeset.valid?
  end
end
