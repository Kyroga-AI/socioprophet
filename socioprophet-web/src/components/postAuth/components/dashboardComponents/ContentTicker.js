import React, { Component } from "react";
import Ticker from 'react-ticker';
import { useParams } from "react-router-dom";

import "./styles/content.css";

export default function Content() {
  let { id } = useParams();
  if (id === 'projects1' | id === 'projects2' | id === 'projects3') {
    return null;
  } else {
    return (
      <div className="sub">
        <div className="sub__ticker">
          <Ticker>
            {({ index }) => (
              <div className="sub__ticker__text">
                <p><span style={{fontWeight: "800"}}>News</span> / IM's #{index}!</p>
              </div>
            )}
          </Ticker>
        </div>
      </div>
    );
  }
}
