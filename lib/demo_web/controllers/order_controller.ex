defmodule DemoWeb.OrderController do
  use DemoWeb, :controller
  alias Demo.ForgeClient

  def create(conn, params) do
    token = Application.fetch_env!(:forge, :token)
    {:ok, order} = ForgeClient.create_order(token, params)
    render conn, "show.json", order: order
  end
end
