import Items from "../collections/items"
import Item from "../models/item"

var Order = Backbone.Model.extend({
  initialize: function(){
    var items = new Items();
    this.set({items: items});
  },
  addItem: function(product_id, price, name){
    let item = new Item({
      product_id: product_id,
      amount: price,
      name: name
    });

    this.get("items").add(item);
  },
  total: function(){
    return this.get("items").map((item) => {
      return parseFloat(item.get("amount"));
    }).reduce((a, b) => a + b, 0);
  }
});

export default Order
