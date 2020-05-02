import CheckoutView from "./checkout_view"
import $ from "jquery"

var OrderView = Backbone.View.extend({
  el: "#menu",
  initialize: function(){
    this.listenTo(this.model.get("items"), "add", this.updateCheckout)
    this.listenTo(this.model.get("items"), "remove", this.updateCheckout)
  },
  updateCheckout: function(){
    let checkoutView = new CheckoutView({model: this.model});
    checkoutView.render();
  },
  events: {
    "click .add_to_cart" : "addToCart"
  },
  addToCart: function(event){
    let parent = $(event.target).closest("[data-id]");

    this.model.addItem(
      parent.data("id"),
      parent.data("price"),
      parent.data("name")
    );
  },
  render: function(){
    console.log("Rendering OrderView")
  }
});

export default OrderView
