import React, { Component } from "react";

import Dock from "react-osx-dock";

import "./styles/footer.css";

class UIFooter extends Component {
  render() {
    return (
      <div>
        <footer className="uifooter">
            <Dock width={800} magnification={0.5} magnifyDirection="up" className="uifooter__dock">
              {["finder", "settings", "terminal", "atom", "slack", "spotify", "trash", "fishbowl"].map((item, index) => (
                <Dock.Item className="uifooter__dock--item" key={index} onClick={() => console.log(item)}>
                  <img src={`src/components/postAuth/images/dock-images/${item}.jpg`} width="40" height="40"/>
                </Dock.Item>
              ))}
            </Dock>

        </footer>
      </div>
    );
  }
}
export default UIFooter;
