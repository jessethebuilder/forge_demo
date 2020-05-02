import Item from "../models/item"

var Items = Backbone.Collection.extend({
  model: Item
});

export default Items
