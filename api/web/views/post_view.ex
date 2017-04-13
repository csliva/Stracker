defmodule Stracker.PostView do
  use Stracker.Web, :view

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, Stracker.PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, Stracker.PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
      post_title: post.post_title,
      time: post.time,
      notes: post.notes,
      user_id: post.user_id
    }
  end
end
