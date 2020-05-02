import Order from "../models/order"
import Item from "../models/item"
import ItemView from "./item_view"

import $ from "jquery"

var CheckoutView = Backbone.View.extend({
  el: "#checkout",
  model: Order,
  render: function(){
    this.$el.empty();

    $(this.model.get("items").models).each((i, item) => { 
      let itemView = new ItemView({model: item});
      this.$el.append(itemView.render().$el);
    });

    this.$el.append(`<div class="total">${this.model.total()}</div>`)
  }
});

export default CheckoutView
