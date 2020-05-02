import $ from "jquery"
import "backbone"

import Order from "./models/order"
import OrderView from "./views/order_view"

class OrderBuilder {
  init(){
    let order = new Order();
    let orderView = new OrderView({model: order});
    orderView.render();
  }
}

export default OrderBuilder;
