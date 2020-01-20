import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Top from "./components/Top";
import TerminalDrawer from "./components/TerminalDrawer";
import "./components/style-top.css";

import { Search } from 'carbon-addons-iot-react';
import { SearchFilterButton } from 'carbon-addons-iot-react';
import { SearchLayoutButton } from 'carbon-addons-iot-react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbSkelton } from "carbon-components-react/lib/components/Breadcrumb";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    const props = () => ({
      labelText: 'Search',
      placeHolderText: '/command OR Search',
    });

    const { user } = this.props.auth;

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

          <button
            style={{
            width: "150px",
            height: "50px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "10rem",
            marginLeft: "30rem",
          }}
          onClick={this.onLogoutClick}
          >
            Logout
          </button>

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

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
