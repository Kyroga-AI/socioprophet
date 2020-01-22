import React, { Component } from "react";
import PropTypes from "prop-types";
import Top from "./dashboardComponents/Top";
import TerminalDrawer from "./dashboardComponents/TerminalDrawer";
import { Search } from 'carbon-addons-iot-react';
import { SearchFilterButton } from 'carbon-addons-iot-react';
import { SearchLayoutButton } from 'carbon-addons-iot-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkelton } from "carbon-components-react/lib/components/Breadcrumb";

import "./styles/dashboard.css";

class Dashboard extends Component {

  render() {

    const props = () => ({
      labelText: 'Search',
      placeHolderText: '/command OR Search',
    });

    return (

        <div>

          <Top />

          <div className="sub-header">
            <Breadcrumb>
              <BreadcrumbItem><a href="#">Breadcrumb 1</a></BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="search">

            <div className="terminal-drawer">
              <TerminalDrawer />
            </div>

          </div>

          <footer className="landing-footer-dashboard">

          <div className="search-bar">

            <Search
              className="some-class"
              closeButtonLabelText="Clear search input"
              defaultValue=""
              id="search-1"
              labelText="Search"
              name=""
              onChange={function noRefCheck(){}}
              placeHolderText="Search"
              small={true}
              type="text"
            />
            <SearchFilterButton
              iconDescription="filter"
              labelText="Search"
              onClick={function noRefCheck(){}}
            />

          </div>

        </footer>
      </div>
    );
  }
}
export default Dashboard;
