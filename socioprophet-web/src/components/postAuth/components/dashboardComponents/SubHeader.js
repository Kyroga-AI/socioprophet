import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkelton } from "carbon-components-react/lib/components/Breadcrumb";

import Ticker from 'react-ticker';

import "./styles/subHeader.css";

class SubHeader extends Component {
  render() {
    return (
      <div className="sub">
        <div className="sub--ticker">
          <Ticker>
            {({ index }) => (
              <div className="ticker">
                <p><span className="news">News</span> / IM's #{index}!</p>
              </div>
            )}
          </Ticker>
          <div className="sub--menu">
            
          </div>
        </div>
      </div>
    );
  }
}
export default SubHeader;
