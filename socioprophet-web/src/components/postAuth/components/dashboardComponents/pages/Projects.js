import React, { Component } from "react";
import Form from "carbon-components-react/lib/components/Form";
import FormGroup from "carbon-components-react/lib/components/FormGroup";
import FormLabel from "carbon-components-react/lib/components/FormLabel";
import TextArea from "carbon-components-react/lib/components/TextArea";
import TextInput from "carbon-components-react/lib/components/TextInput";
import RadioButtonGroup from "carbon-components-react/lib/components/RadioButtonGroup";
import RadioButton from "carbon-components-react/lib/components/RadioButton";
import Button from "carbon-components-react/lib/components/Button";
import { Link } from "react-router-dom";

import "./styles/projects.css";
class Projects extends Component {
  render() {
    return (
      <div className="dashboard__projects">
        <div>
          <div className="dashboard__projects__newProject">
            <div className="dashboard__projects__newProject__header">
              <h3 className="headerTitle">New Project</h3>
            </div>
            <div className="dashboard__projects__newProject__content">
              <Form
                className="contentForm"
                onSubmit={function noRefCheck(){}}
              >
                <h4 className="contentForm__heading">Define project details</h4>
                <div className="contentForm__input contentForm__input--name">
                  <TextInput
                    className=""
                    disabled={false}
                    light={true}
                    id="projectName"
                    labelText="Name"
                    placeholder="Project name"
                    type="text"
                  />
                </div>
                <div className="contentForm__input contentForm__input--description">
                  <TextArea
                    className=""
                    disabled={false}
                    light={true}
                    cols={100}
                    id="projectName"
                    labelText="Description"
                    placeholder="Project description"
                    type="text"
                  />
                </div>
                <h4 className="contentForm__heading"><span style={{paddingTop:"2rem"}}>Collaboration model</span></h4>
                <div className="contentForm__collab">
                  <RadioButtonGroup
                    defaultSelected="default-selected"
                    labelPosition="right"
                    name="radio-button-group--privacy"
                    onChange={function noRefCheck(){}}
                    orientation="horizontal"
                  >
                    <RadioButton
                      className="some-class"
                      id="radio-1"
                      labelText="Public"
                      value="default-selected"
                    />
                    <RadioButton
                      className="some-class"
                      id="radio-2"
                      labelText="Private"
                      value="standard"
                    />
                  </RadioButtonGroup>
                  <RadioButtonGroup
                    defaultSelected="default-selected"
                    labelPosition="right"
                    name="radio-button-group--searchable"
                    onChange={function noRefCheck(){}}
                    orientation="horizontal"
                  >
                    <RadioButton
                      className="radio--left"
                      id="radio-3"
                      labelText="Open"
                      value="default-selected"
                    />
                    <RadioButton
                      className="some-class"
                      id="radio-4"
                      labelText="Closed"
                      value="standard"
                    />
                  </RadioButtonGroup>
                </div>
              </Form>
              <Button>
                <Link to="/news">Link</Link>
              </Button>
            </div>

            <div className="dashboard__projects__form__footer">

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
