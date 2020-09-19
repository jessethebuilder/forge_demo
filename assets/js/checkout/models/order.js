import $ from "jquery"
import Items from "../collections/items"
import Item from "../models/item"

var Order = Backbone.Model.extend({
  defaults: {
    tax_rate: 0,
    tip: 0,
    note: null
  },
  urlRoot: "/orders",
  initialize: function(){
    let items = new Items();
    this.set({items: items});
  },
  resetItems: function(){
    let item_data = this.get("items");
    this.initialize();
    $(item_data).each((i, item_datum) =>{
      let item = new Item(item_datum);
      this.get("items").add(item);
    });
  },
  toJSON: function(){
    let order_json = this.attributes;
    order_json["tax"] = this.tax(); // Tax is calculated.
    return {order: order_json}
  },
  addItem: function(product_id, price, name){
    let item = new Item({
      product_id: product_id,
      amount: parseFloat(price),
      name: name
    });

    this.get("items").add(item);

    return item;
  },
  subTotal: function(){
    return this.get("items").map((item) => {
      return parseFloat(item.get("amount"));
    }).reduce((a, b) => a + b, 0);
  },
  tax: function(){
    return this.subTotal() * this.get("tax_rate");
  },
  total: function(){
    return this.subTotal() + this.tax() + this.get("tip");
  }
});

export default Order
