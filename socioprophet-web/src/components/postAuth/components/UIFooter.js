import React, { Component } from "react";


import "./styles/footer.css";

class UIFooter extends Component {
  render() {
    return (
      <div>
        <footer className="uifooter">
          <div className="uifooter--fish">

          <img src="src/components/postAuth/images/fish.gif" alt="fish icon" width="30px" height="24px"/>
          </div>
        </footer>
      </div>
    );
  }
}
export default UIFooter;
