import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkelton } from "carbon-components-react/lib/components/Breadcrumb";

import Ticker from 'react-ticker';

import News from "./pages/News";
import Law from "./pages/Law";
import Society from "./pages/Society";
import Industry from "./pages/Industry";
import Markets from "./pages/Markets";
import Weather from "./pages/Weather";
import Data from "./pages/Data";
import Projects from "./pages/Projects";
import DashboardHome from "./pages/DashboardHome";

import { useParams } from "react-router-dom";

import "./styles/content.css";

export default function Content() {
  let { id } = useParams();
  if (id === "news") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <News />
      </div>
    );
  } else if (id === "law") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <Law />
      </div>
    );
  } else if (id === "society") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <Society />
      </div>
    );
  } else if (id === "industry") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <Industry />
      </div>
    );
  } else if (id === "markets") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <Markets />
      </div>
    );
  } else if (id === "weather") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <Weather />
      </div>
    );
  } else if (id === "data") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <Data />
      </div>
    );
  } else if (id === "projects") {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <Projects />
      </div>
    );
  } else {
    return (
      <div>
        <div className="sub">
          <div className="sub--ticker">
            <Ticker>
              {({ index }) => (
                <div className="ticker">
                  <p><span className="news">News</span> / IM's #{index}!</p>
                </div>
              )}
            </Ticker>
          </div>
        </div>
        <DashboardHome />
      </div>
    );
  }
}
