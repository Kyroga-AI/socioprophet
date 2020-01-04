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

  render() {

    const props = () => ({
      labelText: 'Search',
      placeHolderText: '/command OR Search',
    });

    const { user } = this.props.auth;

    return (
      <div>
        <Top />
        <br/><br/><br/>

        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
            marginLeft: "30rem"
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout
        </button>

        <div className="search">

          <div className="terminal-drawer">
            <TerminalDrawer />
          </div>
        </div>

        <footer className="landing-footer">
          <div className="social-links_dashboard">
            <a className="social-twitter" href="https://twitter.com/socioprophet" target="_blank"><i className="fa fa-twitter-square" aria-hidden="true"></i></a>
            <a className="social-medium" href="https://medium.com/@socioprophet" target="_blank"><i className="fa fa-medium" aria-hidden="true"></i></a>
            <a className="social-github" href="https://github.com/SocioProphet" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
          </div>
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
          
              {/*}<Search {...props()} />
              <SearchFilterButton
                iconDescription="filter"
                labelText="Search"
                onClick={function noRefCheck(){}}
              />*/}
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
