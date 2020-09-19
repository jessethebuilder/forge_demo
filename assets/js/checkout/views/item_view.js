import Item from "../models/item"
import _ from "underscore"
import $ from "jquery"

var ItemView = Backbone.View.extend({
  model: Item,
  template: _.template($("#checkout_item_template").html()),
  events: {
    "click [name=remove]" : "destroyModel",
    "change [name=note]": "updateNote"
  },
  updateNote: function(event){
    this.model.set({note: $(event.target).val()});
  },
  destroyModel: function(){
    this.model.destroy();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

export default ItemView
