import $ from "jquery"
import "backbone"

import Order from "./models/order"
import OrderView from "./views/order_view"

class CheckoutBuilder {
  constructor(order_params, callbacks){
    let params = { // Defaults
      tax_rate: 0.0,
      success_path: '/'
    }

    for(let key in order_params){
      params[key] = order_params[key];
    }

    this.params = params;
    this.callbacks = callbacks;
  }

  build(){
    this.order = new Order(this.params);
    this.order.callbacks = this.callbacks;
    let orderView = new OrderView({model: this.order});
    orderView.render();
    return this.order;
  }
}

export default CheckoutBuilder;
