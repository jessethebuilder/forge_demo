import CheckoutView from "./checkout_view"
import $ from "jquery"

var OrderView = Backbone.View.extend({
  el: "#menu",
  initialize: function(){
    this.listenTo(this.model.get("items"), "remove", this.model.callbacks["itemRemoved"]);
    this.listenTo(this.model, "sync", this.model.callbacks["orderSynced"]);
  },
  events: {
    "click .add_to_cart" : "addToCart"
  },
  addToCart: function(event){
    let parent = $(event.target).closest("[data-id]");

    let item = this.model.addItem(
      parent.data("id"),
      parent.data("price"),
      parent.data("name")
    );

    this.model.callbacks['itemAdded'](item, parent);
  },
  render: function(){
    console.log("Rendering OrderView");
    let checkoutView = new CheckoutView({model: this.model});
    checkoutView.render();
  }
});

export default OrderView
