import React, { Component } from 'react';
import SubHeader from "./dashboardComponents/SubHeader";
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import Terminal from "./dashboardComponents/Terminal";

// will remove from here into separate component soon

import "./styles/dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <SplitterLayout
        vertical={true}
        secondaryInitialSize={82}
        secondaryMinSize={82}
      >
        <div className="splitter--pane1">
          <div>
            <SubHeader />
          </div>
        </div>
        <div className="splitter--pane2">
          <Terminal />
        </div>
      </SplitterLayout>
    );
  }
}
export default Dashboard;
