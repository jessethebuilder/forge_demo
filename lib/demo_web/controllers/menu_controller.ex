defmodule DemoWeb.MenuController do
  use DemoWeb, :controller
  alias Demo.ForgeClient

  def index(conn, _params) do
    token = Application.fetch_env!(:forge, :token)
    menu_id = Application.fetch_env!(:forge, :menu_id)
    {:ok, menu} = ForgeClient.get_menu(token, menu_id)
    render(conn, "index.html", menu: menu)
  end
end
