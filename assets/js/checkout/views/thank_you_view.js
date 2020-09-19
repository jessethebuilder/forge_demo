import $ from "jquery"
import _ from "underscore"
import Order from "../models/order"

var ThankYouView = Backbone.View.extend({
  model: Order,
  el: "#menu",
  template: _.template($("#thank_you_template").html()),
  render: function(){
    console.log("Rendering Thank You");
    $("[name=checkout_launch]").detach();
    this.$el.html(this.template({order: this.model}));
    window.scrollTo(0, 0);
  }
});

export default ThankYouView
