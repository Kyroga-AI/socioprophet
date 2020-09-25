import React, { Component } from "react";
import ContentSwitcher from "carbon-components-react/lib/components/ContentSwitcher";
import Switch from "carbon-components-react/lib/components/Switch";
import Ticker from 'react-ticker';
import { useParams } from "react-router-dom";

import "./styles/content.css";

export default function Content() {
  let { id } = useParams();

  if (id === 'projects1' | id === 'projects2' | id === 'projects3') {
    var index;
    if (id === 'projects1') {
      index = 0;
    } else if (id === 'projects2') {
      index = 1;
    } else {
      index = 2;
    }
    return (
      <div className="content__tab">
        <ContentSwitcher
          onChange={function noRefCheck(){}}
          selectedIndex={index}
        >
          <Switch
            name="one"
            onClick={function changePage(){
              window.location = "/projects1";
            }}
            selected={false}
            text="Step 1"
          />
          <Switch
            name="two"
            onClick={function changePage(){
              window.location = "/projects2";
            }}
            selected={false}
            text="Step 2"
          />
          <Switch
            name="three"
            onClick={function changePage(e){
              window.location = "/projects3";
            }}
            selected={false}
            text="Step 3"
          />
        </ContentSwitcher>
      </div>

    );
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
