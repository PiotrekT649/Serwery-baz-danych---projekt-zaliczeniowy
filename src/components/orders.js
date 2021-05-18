import React, { Component } from "react";
import OrderDataService from "../services/order.service";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updateRealized = this.updateRealized.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);

    this.state = {
      currentOrder: {
        key: null,
        title: "",
        description: "",
        realized: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { order } = nextProps;
    if (prevState.currentOrder.key !== order.key) {
      return {
        currentOrder: order,
        message: ""
      };
    }

    return prevState.currentOrder;
  }

  componentDidMount() {
    this.setState({
      currentOrder: this.props.order,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentOrder: {
          ...prevState.currentOrder,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentOrder: {
        ...prevState.currentOrder,
        description: description,
      },
    }));
  }

  updateRealized(status) {
    OrderDataService.update(this.state.currentOrder.key, {
      realized: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentOrder: {
            ...prevState.currentOrder,
            realized: status,
          },
          message: "Zamówienie zostało zrealizowane",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateOrder() {
    const data = {
      title: this.state.currentOrder.title,
      description: this.state.currentOrder.description,
    };

    OrderDataService.update(this.state.currentOrder.key, data)
      .then(() => {
        this.setState({
          message: "Zamówienie zostało zaktualizowane",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteOrder() {
    OrderDataService.delete(this.state.currentOrder.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentOrder } = this.state;

    return (
      <div>
        <h4>Szczegóły zamówienia</h4>
        {currentOrder ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Numer i imię zamawiającego</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentOrder.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Zamówiony produkt</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentOrder.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentOrder.realized ? "Zakończone" : "W trakcie realizacji"}
              </div>
            </form>

            {currentOrder.realized ? (
              <button
                className="btn btn-sm btn-success mr-1"
                onClick={() => this.updateRealized(false)}
              >
                Zakończone
              </button>
            ) : (
              <button
                className="btn btn-sm btn-warning mr-1"
                onClick={() => this.updateRealized(true)}
              >
                W realizacji
              </button>
            )}

            <button
              className="btn btn-sm btn-outline-danger mr-1"
              onClick={this.deleteOrder}
            >
              Usuń
            </button>

            <button
              type="submit"
              className="btn btn-sm btn-outline-info mr-1"
              onClick={this.updateOrder}
            >
              Zaktualizuj
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Prosze wybrać zamówienie ...</p>
          </div>
        )}
      </div>
    );
  }
}