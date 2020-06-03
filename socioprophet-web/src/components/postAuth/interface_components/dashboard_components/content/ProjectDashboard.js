import React, { Component } from "react";
import { DataTable } from "@carbon/ibm-security";

import "./styles/projectDashboard.css";
class ProjectDashboard extends Component {
  render() {
    return (
      <div className="project--home">
        <h1 className="project--home__heading">Project List</h1>
        <DataTable
          filterRows={undefined}
          headers={[
            {
              header: "Latest Configuration",
              key: "lastSighted",
            },
            {
              header: "Project Name",
              key: "name",
            },

            {
              header: "Attack phase",
              key: "attackPhase",
            },
            {
              header: "Method",
              key: "method",
            },
            {
              header: "Missing",
              key: "missing",
            },
          ]}
          isSelectable={false}
          isSortable={false}
          missingDataCharacter="–"
          render={undefined}
          rows={[
            {
              attackPhase: "Initial Compromise",
              id: "7c34f4507156b35",
              lastSighted: "11/28/2018",
              method: "Phishing",
              name: "IBM X-Force",
              type: "IPv6",
            },
            {
              attackPhase: "Establish Foothold",
              id: "38347816a51b0c5a8",
              lastSighted: "06/28/2017",
              method: "Deploy backdoor",
              name: "AppX",
              type: "Hash",
            },
            {
              attackPhase: "Escalate Privileges",
              id: "1d6116a2d1d03b4",
              lastSighted: "05/30/2018",
              method: "Credential dumping",
              name: "Bigfix",
              type: "URL",
            },
          ]}
          sortRow={undefined}
          useZebraStyles={false}
        />
      </div>
    );
  }
}

export default ProjectDashboard;
