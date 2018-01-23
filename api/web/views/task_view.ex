defmodule Stracker.TaskView do
  use Stracker.Web, :view

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, Stracker.TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, Stracker.TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      task_title: task.task_title,
      description: task.description,
    }
  end
end
