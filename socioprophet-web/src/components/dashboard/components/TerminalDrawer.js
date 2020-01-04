import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ReactTerminal from 'react-terminal-component';
import { ReactThemes } from 'react-terminal-component';
import "./terminal.css";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    bottom: false
  });

  const toggleDrawer = (side, open) => event => {
    setState({ state, [side]: open });
  };

  const fullList = () => (
    <div>
      <div className="drawer-close">
        <button className="close-button" onClick={toggleDrawer('bottom', false)}>^</button>
      </div>
      <div className="react-terminal">
        <ReactTerminal />
      </div>
    </div>
  );

  return (
    <div className="drawer-open">
      <button className="open-button" onClick={toggleDrawer('bottom', true)}>

        <ul><li>^</li></ul></button>
      <Drawer anchor="bottom" open={state.bottom}>
        {fullList()}
      </Drawer>
    </div>
  );
}
