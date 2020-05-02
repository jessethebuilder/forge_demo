import Item from "../models/item"
import _ from "underscore"
import $ from "jquery"

var ItemView = Backbone.View.extend({
  model: Item,
  template: _.template($("#item_template").html()),
  render: function(){

    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

export default ItemView
