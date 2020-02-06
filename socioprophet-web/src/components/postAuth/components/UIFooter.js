import React, { Component } from "react";

import "./styles/footer.css";

class UIFooter extends Component {
  render() {
    return (
      <div>
        <footer className="uifooter">
          <div className="uifooter--fish">
            <img src="src/components/postAuth/images/fish.jpg" alt="fish icon" width="30px" height="30px"/>
          </div>
        </footer>
      </div>
    );
  }
}
export default UIFooter;
