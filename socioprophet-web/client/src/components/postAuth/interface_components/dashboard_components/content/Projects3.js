import React, { Component } from "react";
import Form from "carbon-components-react/lib/components/Form";
import NumberInput from "carbon-components-react/lib/components/NumberInput";

import Button from "carbon-components-react/lib/components/Button";
import { Link } from "react-router-dom";

import "./styles/projects3.css";
class Projects3 extends Component {
  render() {
    return (
      <div className="sThree">
        <div className="new">
          <div className="new__header">
            <h3 className="new__header__title">Project Services</h3>
          </div>
          <Form className="new__form" onSubmit={function noRefCheck() {}}>
            <h4 className="new__form__heading">Collaborator Restrictions</h4>
            <NumberInput
              className="some-class"
              id="number-input-1"
              label="Collaborators"
              max={1000}
              min={0}
              step={1}
              value={1}
            />
          </Form>
          <div className="new__footer">
            <div className="new__footer__pageBtn">
              <Button className="cancel" size="small">
                <Link
                  className="new__footer__pageBtn__cancelLink"
                  to="/dashboard"
                >
                  Cancel
                </Link>
              </Button>
              <Button className="next" size="small">
                <Link
                  className="new__footer__pageBtn__nextLink"
                  to="/projectDashboard"
                >
                  Create
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects3;
