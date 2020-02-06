import React, { Component } from 'react';
import ReactTerminal from 'react-terminal-component';
import { ReactThemes } from 'react-terminal-component';
import { Search } from '@carbon/ibm-security';

import 'react-splitter-layout/lib/index.css';
import "./styles/terminal.css";

class Terminal extends Component {
  render() {
    return (
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
        <div className="drawer--terminal">
          <ReactTerminal theme={{
            background: '#36454f',
            promptSymbolColor: '#6effe6',
            commandColor: '#fcfcfc',
            outputColor: '#fcfcfc',
            errorOutputColor: '#ff89bd',
            fontSize: '1.1rem',
            spacing: '1%',
            fontFamily: 'monospace',
            width: '100%',
            height: '100%'
          }}/>
        </div>
      </div>
    );
  }
}
export default Terminal;
