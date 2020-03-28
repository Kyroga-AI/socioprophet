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

import "./styles/projects2.css";
class Projects2 extends Component {
  render() {
    return (
      <div className="dashboard__projects">
        <div>
          <div className="dashboard__projects__newProject">
            <div className="dashboard__projects__newProject__header">
              <h3 className="headerTitle">Compute & Storage</h3>
            </div>
            <div className="dashboard__projects__newProject__content">
              <Form
                className="contentForm"
                onSubmit={function noRefCheck(){}}
              >
                <h4 className="contentForm__heading">Compute Options</h4>

                <h4 className="contentForm__heading"><span style={{paddingTop:"2rem"}}>Collaborator Restrictions</span></h4>

                <div className="contentForm__pageBtn">
                  <Button
                    className="cancel"
                    size="small"
                  >
                    <Link className="cancel__link" to="/dashboard">Cancel</Link>
                  </Button>
                  <Button
                    className="next"
                    size="small"
                  >
                    <Link className="next__link" to="/projects3">Next</Link>
                  </Button>
                </div>
              </Form>
            </div>

            <div className="dashboard__projects__form__footer">

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Projects2;
