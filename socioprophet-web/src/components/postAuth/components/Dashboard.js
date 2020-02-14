import React, { Component } from 'react';
import SubHeader from "./dashboardComponents/SubHeader";
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import Terminal from "./dashboardComponents/Terminal";

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
        <div className="splitter--primary">
          <SubHeader />
        </div>
        <div className="splitter--secondary">
          <button className="toggle-btn" type="button" onClick={this.toggleBar}>
            ^
          </button>
          <Terminal />
        </div>
      </SplitterLayout>
    );
  }
}
export default Dashboard;
