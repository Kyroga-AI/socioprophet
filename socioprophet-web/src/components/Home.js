import React, { Component } from "react";
import "./Home.css";
import Top from "./Top";
import TerminalDrawer from "./TerminalDrawer";
import GlobalHeader from  "/.GlobalHeader";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div><GlobalHeader /></div>
        <div><TerminalDrawer /></div>
      </div>
    );
  }
}
