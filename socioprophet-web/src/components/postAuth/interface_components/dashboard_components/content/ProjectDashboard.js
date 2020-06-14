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
              key: "dateConfigured",
            },
            {
              header: "Project Name",
              key: "projectName",
            },

            {
              header: "Public",
              key: "publicPrivate",
            },
            {
              header: "Open",
              key: "openClosed",
            },
            {
              header: "Compute",
              key: "computeOptions",
            },
            {
              header: "Cluster",
              key: "clusterOptions",
            },
            {
              header: "Collaborator Restrictions",
              key: "collaborators",
            },
          ]}
          isSelectable={false}
          isSortable={false}
          missingDataCharacter="–"
          render={undefined}
          rows={[
            {
              id: "1",
              dateConfigured: "4 June 20",
              projectName: "SP Project",
              publicPrivate: "true",
              openClosed: "false",
              computeOptions: "option 1",
              clusterOptions: "cluster 3",
              collaborators: "3",
            },
            {
              id: "2",
              dateConfigured: "5 June 20",
              projectName: "my socioprophet test project",
              publicPrivate: "false",
              openClosed: "false",
              computeOptions: "option 2",
              clusterOptions: "cluster 1",
              collaborators: "1",
            },
            {
              id: "3",
              dateConfigured: "6 June 20",
              projectName: "test-sp",
              publicPrivate: "true",
              openClosed: "true",
              computeOptions: "option 3",
              clusterOptions: "cluster 2",
              collaborators: "100",
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
