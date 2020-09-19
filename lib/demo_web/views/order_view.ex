defmodule DemoWeb.OrderView do
  use DemoWeb, :view

  def render("show.json", %{order: order}) do
    order
  end
end
