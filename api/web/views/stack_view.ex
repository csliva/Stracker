defmodule Stracker.StackView do
  use Stracker.Web, :view

  def render("index.json", %{stacks: stacks}) do
    %{data: render_many(stacks, Stracker.StackView, "stack.json")}
  end

  def render("show.json", %{stack: stack}) do
    %{data: render_one(stack, Stracker.StackView, "stack.json")}
  end

  def render("stack.json", %{stack: stack}) do
    %{id: stack.id,
      stack_title: stack.stack_title,
      description: stack.description,
    }
  end
end
