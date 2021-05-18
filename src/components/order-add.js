import React, { Component } from "react";
import OrderDataService from "../services/order.service";

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.newOrder = this.newOrder.bind(this);

    this.state = {
      title: "",
      description: "",
      realized: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveOrder() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      realized: false
    };

    OrderDataService.create(data)
      .then(() => {
        console.log("Dodano nowe zamówienie");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newOrder() {
    this.setState({
      title: "",
      description: "",
      realized: false,
      submitted: false,
    });
  }

  render(){
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Zamówienie zostało dodane do systemu!</h4>
              <button className="btn btn-success" onClick={this.newOrder}>
                Dodaj kolejne zamówienie
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Numer i imię zamawiającego</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Szczegóły zamówienia</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
  
              <button onClick={this.saveOrder} className="btn btn-outline-success">
                Potwierdź
              </button>
            </div>
          )}
        </div>
      );
  }
}