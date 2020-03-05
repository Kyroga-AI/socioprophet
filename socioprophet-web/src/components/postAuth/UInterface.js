import React, { Component } from "react";
import UIFrame from "./components/UIFrame";
import Dashboard from "./components/Dashboard";
import UIFooter from "./components/UIFooter";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class UInterface extends Component {
  render() {
    return (
      <div>
        <UIFrame />
        <Dashboard />
        <UIFooter />
      </div>
    );
  }
}
export default UInterface;
