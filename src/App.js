import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./comp/Home";
import Header from "./comp/Header";
import DetailBeer from "./comp/DetailBeer";
import NotFound from "./comp/NotFound";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:beerId" component={DetailBeer} />
              <Route component={NotFound} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
