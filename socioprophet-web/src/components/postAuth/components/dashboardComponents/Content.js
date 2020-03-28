import React, { Component } from "react";

import News from "./pages/News";
import Law from "./pages/Law";
import Society from "./pages/Society";
import Industry from "./pages/Industry";
import Markets from "./pages/Markets";
import Weather from "./pages/Weather";
import Data from "./pages/Data";
import Projects1 from "./pages/Projects1";
import Projects2 from "./pages/Projects2";
import Projects3 from "./pages/Projects3";
import DashboardHome from "./pages/DashboardHome";

import { useParams } from "react-router-dom";

import "./styles/content.css";

export default function Content() {
  let { id } = useParams();
  switch (id) {
    case 'news':
      return <News />;
    case 'law':
      return <Law />;
    case 'society':
      return <Society />;
    case 'industry':
      return <Industry />;
    case 'markets':
      return <Markets />;
    case 'weather':
      return <Weather />;
    case 'data':
      return <Data />;
    case 'projects1':
      return <Projects1 />;
    case 'projects2':
      return <Projects2 />;
    case 'projects3':
      return <Projects3 />;
    default:
      return <DashboardHome />;
  }
}
