import React, { Component } from "react";
import Form from "carbon-components-react/lib/components/Form";
import FormLabel from "carbon-components-react/lib/components/FormLabel";
import TextArea from "carbon-components-react/lib/components/TextArea";
import TextInput from "carbon-components-react/lib/components/TextInput";
import RadioButtonGroup from "carbon-components-react/lib/components/RadioButtonGroup";
import RadioButton from "carbon-components-react/lib/components/RadioButton";
import Button from "carbon-components-react/lib/components/Button";
import { Link } from "react-router-dom";

import "./styles/projects1.css";
class Projects1 extends Component {
  render() {
    return (
      <div className="sOne">
        <div className="new">
          <div className="new__header">
            <h3 className="new__header__title">New Project</h3>
          </div>
          <Form
            className="new__form"
            onSubmit={function noRefCheck(){}}
          >
            <h4 className="new__form__heading">Define project details</h4>
            <div style={{ marginBottom : "2rem" }}>
              <TextInput
                disabled={false}
                light={true}
                id="projectName"
                labelText="Name"
                placeholder="Project name"
                type="text"
              />
            </div>
            <div>
              <TextArea
                disabled={false}
                light={true}
                cols={100}
                id="projectName"
                labelText="Description"
                placeholder="Project description"
                type="text"
              />
            </div>
            <h4 className="new__form__heading"><span style={{ paddingTop : "2rem" }}>Collaboration model</span></h4>
            <div className="new__form__collab">
              <RadioButtonGroup
                defaultSelected="default-selected"
                labelPosition="right"
                name="radio-button-group--privacy"
                onChange={function noRefCheck(){}}
                orientation="horizontal"
              >
                <RadioButton
                  id="radio-1"
                  labelText="Public"
                  value="default-selected"
                />
                <RadioButton
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
                  id="radio-3"
                  labelText="Open"
                  value="default-selected"
                />
                <RadioButton
                  id="radio-4"
                  labelText="Closed"
                  value="standard"
                />
              </RadioButtonGroup>
            </div>
          </Form>
          <div className="new__footer">
            <div className="new__footer__pageBtn">
              <Button
                className="cancel"
                size="small"
              >
                <Link className="new__footer__pageBtn__cancelLink" to="/dashboard">Cancel</Link>
              </Button>
              <Button
                className="next"
                size="small"
              >
                <Link className="new__footer__pageBtn__nextLink" to="/projects2">Next</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects1;
