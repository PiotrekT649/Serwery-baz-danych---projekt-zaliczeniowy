import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddOrder from "./components/order-add";
import OrderList from "./components/order-list";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-info">
          <a href="/orders" className="navbar-brand">
            <h3>Neapoletanium</h3>
          </a>
          <div className="navbar-nav mr-auto">
            
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                Panel zamówień
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link ">
                Dodaj zamówienie
              </Link>
            </li>
          </div>
          <div>
          <ul className="nav navbar-text navbar-right">Piotr Tyszka 46361 INIS6_FD</ul>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>Panel zamówień</h2>
          <Switch>
            <Route exact path="/add" component={AddOrder} />
            <Route exact path={["/", "/orders"]} component={OrderList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;