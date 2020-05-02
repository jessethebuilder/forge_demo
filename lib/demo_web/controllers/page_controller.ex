defmodule DemoWeb.PageController do
  use DemoWeb, :controller
  alias Demo.ForgeClient

  def index(conn, _params) do
    token = "8X6kXP5X1OzDS10MA8olGAtt"
    {:ok, menu} = ForgeClient.fetch_menu(token)

    render(conn, "index.html", menu: menu)
  end
end
