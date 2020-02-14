import React, { Component } from "react";
import ReactTerminal from 'react-terminal-component';
import { ReactThemes } from 'react-terminal-component';

import "./styles/terminal.css";

class PopoutTerminal extends Component {
  render() {
    return (
      <div className="popout-container">
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
    );
  }
}
export default PopoutTerminal;
