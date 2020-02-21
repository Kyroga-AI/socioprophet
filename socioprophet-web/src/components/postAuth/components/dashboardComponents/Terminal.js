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
      var popout = <button className="popout-btn" onClick={this.popoutClosed}>&#8690;</button>
      return (
        <div className="container">
          <Popout url='/terminal' title='Window title' onClosing={this.popoutClosed} />
          <div className="drawer">
            <div className="drawer--bar">
              <strong>{popout}</strong>
              <div className="drawer--bar--search">
              </div>
            </div>
            <div className="drawer--content">
              <div className="drawer--content--tab">
                <div className="tablist">

                </div>
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
      var popout = <button className="popout-btn" onClick={this.popout}>&#8689;</button>
      return (
        <div className="drawer">
          <div className="drawer--bar">
            <strong>{popout}</strong>
            <div className={this.props.barVisible ? "drawer--bar--hidden" : "drawer--bar--search"}>
              <Search
                closeButtonLabelText="Clear search input"
                defaultValue=""
                id="search-1"
                labelText="Search"
                name=""
                onChange={function noRefCheck(){}}
                placeHolderText="/command or search..."
                size="sm"
                type="text"
                light={false}
              />
            </div>
          </div>
          <div className="drawer--content">
            <div className="drawer--content--tab">
              <div className="tab-top-bar">
                <div className="tab-bar-container">
                  <div>
                    <div role="tab" className="tab">
                      Session 1
                      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="tabs__close"><path d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"></path></svg>
                      <button title="Open a new session" tabIndex="0" className="add-session-btn">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
                      </button>
                    </div>
                  </div>
                  <div className="ink-bar">
                  </div>
                </div>
              </div>
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
