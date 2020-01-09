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
      <div className="drawer-closed">
        <button className="close-button" onClick={toggleDrawer('bottom', false)}>

          <ul><li>&#8690;</li></ul></button>

      </div>
      <div className="react-terminal">
        <ReactTerminal />
      </div>
    </div>
  );

  return (
    <div className="drawer-opened">
      <button className="open-button" onClick={toggleDrawer('bottom', true)}>

        <ul><li><p className="up-arrow">&#8689;</p></li></ul></button>

      <Drawer anchor="bottom" open={state.bottom}>
        {fullList()}
      </Drawer>
    </div>
  );
}
