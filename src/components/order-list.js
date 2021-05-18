import React, { Component } from "react";
import OrderDataService from "../services/order.service";

import Order from "./orders";

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrder = this.setActiveOrder.bind(this);
    this.removeAllOrders = this.removeAllOrders.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      Orders: [],
      currentOrder: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    OrderDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    OrderDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let orders = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      orders.push({
        key: key,
        title: data.title,
        description: data.description,
        realized: data.realized,
      });
    });

    this.setState({
      orders: orders,
    });
  }

  refreshList() {
    this.setState({
      currentOrder: null,
      currentIndex: -1,
    });
  }

  setActiveOrder(order, index) {
    this.setState({
      currentOrder: order,
      currentIndex: index,
    });
  }

  removeAllOrders() {
    OrderDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { orders, currentOrder, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          {currentOrder ? (
            <Order order={currentOrder} refreshList={this.refreshList} />
          ) : (
            <div>
              <br />
              <p>- Prosze wybrać zamówienie -</p>
            </div>
          )}
        </div>
        <div className="col-md-12">
          <h4>Lista zamówień</h4>

          <ul className="list-group">
            {orders &&
              orders.map((order, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveOrder(order, index)}
                  key={index}
                >
                  {order.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-md  btn-outline-danger"
            onClick={this.removeAllOrders}
          >
            Wyczyść
          </button>
        </div>
        
      </div>
    );
  }
}
