defmodule Demo.ForgeClient do
  def fetch_menu(token) do
    url = "http://localhost:3000/menus?deep=true"
    headers = [
      "Authorization": "Token #{token}",
      "ACCEPT": "application/json"
    ]
    {:ok, response} = HTTPoison.get(url, headers)
    {:ok, [menu | _tail]} = Poison.decode(response.body)

    {:ok, menu}
  end

  def test do
    fetch_menu("aAQyllD0USnOr0ObrW8mQgtt")
  end
end
