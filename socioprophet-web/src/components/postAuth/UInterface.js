import React, { Component } from "react";
import UIFrame from "./interface_components/UIFrame";
import Dashboard from "./interface_components/Dashboard";
import UIFooter from "./interface_components/UIFooter";

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
