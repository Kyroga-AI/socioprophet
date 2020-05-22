import React, { Component } from "react";

import News from "./content/News";
import Law from "./content/Law";
import Society from "./content/Society";
import Industry from "./content/Industry";
import Markets from "./content/Markets";
import Weather from "./content/Weather";
import Data from "./content/Data";
import Projects1 from "./content/Projects1";
import Projects2 from "./content/Projects2";
import Projects3 from "./content/Projects3";
import DashboardHome from "./content/DashboardHome";

import { useParams } from "react-router-dom";

import "./styles/content.css";

export default function Content() {
  let { id } = useParams();
  switch (id) {
    case "news":
      return <News />;
    case "law":
      return <Law />;
    case "society":
      return <Society />;
    case "industry":
      return <Industry />;
    case "markets":
      return <Markets />;
    case "weather":
      return <Weather />;
    case "data":
      return <Data />;
    case "projects1":
      return <Projects1 />;
    case "projects2":
      return <Projects2 />;
    case "projects3":
      return <Projects3 />;
    default:
      return <DashboardHome />;
  }
}
