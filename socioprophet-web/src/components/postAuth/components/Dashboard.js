import React, { Component } from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SplitterLayout from 'react-splitter-layout';
import Dock from "react-osx-dock";

import ContentTicker from "./dashboardComponents/ContentTicker";
import Content from "./dashboardComponents/Content";
import Terminal from "./dashboardComponents/Terminal";
import News from "./dashboardComponents/pages/News";

import { useParams } from "react-router-dom";

import 'react-splitter-layout/lib/index.css';
import "./styles/dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggleBar = this.toggleBar.bind(this);
    this.state = {
      barVisible: false
    };
  }

  toggleBar() {
    this.setState(state => ({ barVisible: !state.barVisible }));
  }

  render() {
    return (
      <SplitterLayout
        customClassName={this.state.barVisible ? "splitter__show" : "splitter__hide"}
        vertical={true}
      >
        <div className="splitter__primary">
          <ContentTicker />
          <Content />
        </div>
        <div className="splitter__secondary">
          <button className={this.state.barVisible ? "toggle--down" : "toggle--up"} type="button" onClick={this.toggleBar}>
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40"><g><path d="m31 26.4q0 0.3-0.2 0.5l-1.1 1.2q-0.3 0.2-0.6 0.2t-0.5-0.2l-8.7-8.8-8.8 8.8q-0.2 0.2-0.5 0.2t-0.5-0.2l-1.2-1.2q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.6-0.2t0.5 0.2l10.4 10.4q0.2 0.2 0.2 0.5z"></path></g></svg>
          </button>
          <Terminal barVisible={this.state.barVisible}/>
        </div>
      </SplitterLayout>
    );
  }
}
export default Dashboard;
