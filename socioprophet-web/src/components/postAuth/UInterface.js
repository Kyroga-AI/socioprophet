import React, { Component } from "react";
import UIFrame from "./components/UIFrame";
import Dashboard from "./components/Dashboard";
import UIFooter from "./components/UIFooter";

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
