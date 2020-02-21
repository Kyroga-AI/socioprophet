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
          <button className={this.state.barVisible ? "toggle-down" : "toggle-up"} type="button" onClick={this.toggleBar}>
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40"><g><path d="m31 26.4q0 0.3-0.2 0.5l-1.1 1.2q-0.3 0.2-0.6 0.2t-0.5-0.2l-8.7-8.8-8.8 8.8q-0.2 0.2-0.5 0.2t-0.5-0.2l-1.2-1.2q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.6-0.2t0.5 0.2l10.4 10.4q0.2 0.2 0.2 0.5z"></path></g></svg>
          </button>
          <Terminal barVisible={this.state.barVisible}/>
        </div>
      </SplitterLayout>
    );
  }
}
export default Dashboard;
