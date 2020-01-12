import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Top from "./components/Top";
import TerminalDrawer from "./components/TerminalDrawer";
import "./components/style-top.scss";

import { Search } from 'carbon-addons-iot-react';
import { SearchFilterButton } from 'carbon-addons-iot-react';
import { SearchLayoutButton } from 'carbon-addons-iot-react';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    document.getElementById('mySidebar').style.display = "block";
  }

  close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  render() {

    const props = () => ({
      labelText: 'Search',
      placeHolderText: '/command OR Search',
    });

    const { user } = this.props.auth;

    return (
      <div>
      <div className="w3-sidebar w3-bar-block w3-border-right" id="mySidebar" style={{display: "none"}}>
        <button className="w3-bar-item w3-large" id="clicked" onClick={this.close}>&times;</button>
          <a href="#" className="w3-bar-item w3-button">Link 1</a>
          <a href="#" className="w3-bar-item w3-button">Link 2</a>
          <a href="#" className="w3-bar-item w3-button">Link 3</a>
      </div>

      <div className="w3-teal">
        <button className="w3-button w3-teal w3-xlarge" id="now-close" onClick={this.open}><svg focusable="false" preserveAspectRatio="xMidYMid meet" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="security--icon security--toolbar__icon"><path d="M2 14.8h16V16H2zm0-3.6h16v1.2H2zm0-3.6h16v1.2H2zM2 4h16v1.2H2z"></path></svg></button>
      </div>
        <Top />
        <button
          style={{
            width: "150px",
            height: "50px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
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
