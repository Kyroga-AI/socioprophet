import React, { Component } from 'react';
import ReactTerminal from 'react-terminal-component';
import { ReactThemes } from 'react-terminal-component';
import { Search } from '@carbon/ibm-security';

import Popout from 'react-popout';

import "./styles/terminal.css";

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
    this.state = {
      isPopppedOut: false
    };
  }

  popout() {
    this.setState({isPoppedOut: true});
  }

  popoutClosed() {
    this.setState({isPoppedOut: false});
  }

  render() {
    if (this.state.isPoppedOut) {
      return (
        <div className="container">
          <Popout url='/terminal' title='Window title' onClosing={this.popoutClosed} />
          <div className="drawer">
            <div className="drawer--bar">
              <div className="drawer--bar--search">
                <Search
                  closeButtonLabelText="Clear search input"
                  defaultValue=""
                  id="search-1"
                  labelText="Search"
                  name=""
                  onChange={function noRefCheck(){}}
                  placeHolderText="Search..."
                  size="sm"
                  type="text"
                  light={true}
                />
              </div>
            </div>
            <div className="drawer--content">
              <div className="drawer--content--tab">
                <div className="drawer--content--tab--heading">yarn start</div>
                <button className="drawer--content--tab--plus">
                  <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40">
                    <g><path d="m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z"></path></g>
                  </svg>
                </button>
              </div>
              <div className="drawer--content--terminal">
                <ReactTerminal theme={{
                  background: '#1c2022',
                  promptSymbolColor: '#fff',
                  commandColor: '#fff',
                  outputColor: '#fff',
                  errorOutputColor: '#fff',
                  height: '100%;',
                  fontFamily: 'monospace'
                }}/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      var popout = <p className="popout-btn"><button onClick={this.popout}>&#11016;</button></p>
      return (
        <div className="drawer">
          <div className="drawer--bar">
            <strong>{popout}</strong>
            <div className="drawer--bar--search">
              <Search
                closeButtonLabelText="Clear search input"
                defaultValue=""
                id="search-1"
                labelText="Search"
                name=""
                onChange={function noRefCheck(){}}
                placeHolderText="Search..."
                size="sm"
                type="text"
                light={false}
              />
            </div>
          </div>
          <div className="drawer--content">
            <div className="drawer--content--tab">
              <div className="drawer--content--tab--heading">yarn start</div>
              <button className="drawer--content--tab--plus">
                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40">
                  <g><path d="m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z"></path></g>
                </svg>
              </button>
            </div>
            <div className="drawer--content--terminal">
              <ReactTerminal theme={{
                background: '#1c2022',
                promptSymbolColor: '#fff',
                commandColor: '#fff',
                outputColor: '#fff',
                errorOutputColor: '#fff',
                height: '100%;',
                fontFamily: 'monospace'
              }}/>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default Terminal;
