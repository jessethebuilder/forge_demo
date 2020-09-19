defmodule Demo.ForgeClient do
  def get_menus(token) do
    url = "#{api_root()}/menus?deep=true"
    {:ok, response} = HTTPoison.get(url, headers(token))
    {:ok, menus} = Poison.decode(response.body)
    {:ok, menus}
  end

  def get_menu(token, menu_id) do
    url = "#{api_root()}/menus/#{menu_id}?deep=true"
    {:ok, response} = HTTPoison.get(url, headers(token))
    {:ok, menu} = Poison.decode(response.body)
    {:ok, menu}
  end

  def create_order(token, order_params) do
    url = "#{api_root()}/orders.json"
    params = Poison.encode!(order_params)
    response = HTTPoison.post!(url, params, headers(token))
    {:ok, Poison.decode!(response.body)}
  end

  def headers(token) do
    [
      "Authorization": "Token #{token}",
      "ACCEPT": "application/json",
      "Content-Type": "application/json"
    ]
  end

  def api_root do
    Application.fetch_env!(:forge, :url)
  end
end
