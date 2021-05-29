defmodule Demo.ForgeClient do
  def get_menus(token) do
    url = "#{api_root()}/menus?deep=true"
    response = HTTPoison.get!(url, headers(token))
    Poison.decode(response.body)
  end

  def get_menu(token, menu_id) do
    url = "#{api_root()}/menus/#{menu_id}?deep=true"
    response = HTTPoison.get!(url, headers(token))
    Poison.decode(response.body)
  end

  def get_order(token, order_id) do
    url = "#{api_root()}/orders/#{order_id}.json"
    response = HTTPoison.get!(url, headers(token))
    Poison.decode(response.body)
  end

  def create_order(token, order_params) do
    url = "#{api_root()}/orders.json"
    params = Poison.encode!(%{order: order_params})
    response = HTTPoison.post!(url, params, headers(token))
    Poison.decode(response.body)
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
