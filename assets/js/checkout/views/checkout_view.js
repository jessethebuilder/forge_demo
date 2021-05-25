import $ from "jquery"
import _ from "underscore"
import Order from "../models/order"
import ItemView from "./item_view"
import ThankYouView from "./thank_you_view"

var CheckoutView = Backbone.View.extend({
  el: "#checkout",
  model: Order,
  template: _.template($("#checkout_template").html()),
  form_template: _.template($("#checkout_form_template").html()),
  initialize: function(){
    this.listenTo(this.model, "change:tip", this.renderList);
    this.listenTo(this.model.get("items"), "add", this.renderList);
    this.listenTo(this.model.get("items"), "remove", this.renderList);
    this.listenTo(this.model, "sync", this.parseSync);
    // checkout_launch should be provided in page HTML.
    $('[name=checkout_launch]').click((event) => {
      this.openCheckout();
    });
  },
  parseSync: function(order, response){
    // Normally, the server would return a error code. Here, we are just passing
    // the respnose from Forge forward, so here, we will determine if it is an error or not.
    if(this.model.get("id")){
      this.model.resetItems(); // This should be on Order, maybe with a #sync override.
      $("[name=checkout_modal]").modal("hide");
      let thank_you_view = new ThankYouView({model: this.model});
      thank_you_view.render();
    } else {
      console.log(response);
    }
  },
  findFocus: function(){
    // Determines which input gets focus on render
    let tip_input = this.$el.find("[name=tip]");
    if(tip_input.val() === ""){
      tip_input.focus(); // No tip, focus on tip input.
    } else {
      this.$el.find("[name=cc]").focus(); // Otherwise, get CC.
    }
  },
  openCheckout: function(){
    $("[name=checkout_modal]").modal("show").on("shown.bs.modal", () => {
      this.findFocus();
    });
  },
  events: {
    "change [name=tip]" : "updateTip",
    "change [name=note]" : "updateNote",
    "submit [name=checkout_form]" : "createOrder"
  },
  createOrder: function(event){
    event.preventDefault();
    this.model.save();
    let modal_body = this.$el.find(".modal-body");
    modal_body.css({height: modal_body.height() + "px"})
    modal_body.html('<h3 class="submitting_order">Submitting Order....</h3>');
  },
  updateNote: function(event){
    // DRY this with updateTip
    this.model.set({note: $(event.target).val()});
  },
  updateTip: function(event){
    let tip = parseFloat($(event.target).val()) || 0;
    this.model.set({tip: tip});
  },
  renderList: function(){
    this.updateItemCount();

    let modal_body = this.$el.find(".modal-body");
    modal_body.empty();

    modal_body.append(this.form_template({order: this.model}));
    let list = this.$el.find("[name=items]");

    $(this.model.get("items").models).each((i, item) => {
      let itemView = new ItemView({model: item});
      list.append(itemView.render().$el);
    });
  },
  updateItemCount: function(){
    // Target an element on the page with the name of "item_count", which will
    // not be within the HTML of this view, but should be provided in page HTML.
    let item_count = this.model.get("items").length;
    let launcher = $("[name=checkout_launch]");

    if(item_count === 0){
      launcher.hide();
    } else {
      launcher.find("[name=item_count]").text(item_count);
      launcher.show(200);
    }
  },
  render: function(){
    this.$el.html(this.template({order: this.model}));
    this.renderList();
  }
});

export default CheckoutView
