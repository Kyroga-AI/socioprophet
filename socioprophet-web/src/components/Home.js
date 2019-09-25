import React, { Component } from "react";
import "./Home.css";
import Top from "./Top";
import TerminalDrawer from "./TerminalDrawer";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div><Top /></div>
        <div><TerminalDrawer /></div>
      </div>
    );
  }
}
