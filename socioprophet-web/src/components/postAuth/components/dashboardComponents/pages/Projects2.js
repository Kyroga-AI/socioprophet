import React, { Component } from "react";
import Form from "carbon-components-react/lib/components/Form";
import FormLabel from "carbon-components-react/lib/components/FormLabel";
import Checkbox from "carbon-components-react/lib/components/Checkbox";
import NumberInput from "carbon-components-react/lib/components/NumberInput";
import Button from "carbon-components-react/lib/components/Button";
import { Link } from "react-router-dom";

import "./styles/projects2.css";
class Projects2 extends Component {
  render() {
    return (
      <div className="sTwo">
        <div className="new">
          <div className="new__header">
            <h3 className="new__header__title">Compute & Storage</h3>
          </div>
          <Form
            className="new__form"
            onSubmit={function noRefCheck(){}}
          >
            <h4 className="new__form__heading">Compute Options</h4>
            <div style={{ marginBottom : "2rem" }}>
              <Checkbox
                className="some-class"
                defaultChecked
                id="checkbox-0"
                indeterminate={false}
                labelText="Compute option 1"
                onChange={function noRefCheck(){}}
              />
              <Checkbox
                className="some-class"
                id="checkbox-1"
                indeterminate={false}
                labelText="Compute option 2"
                onChange={function noRefCheck(){}}
              />
              <Checkbox
                className="some-class"
                id="checkbox-2"
                indeterminate={false}
                labelText="Compute option 3"
                onChange={function noRefCheck(){}}
              />
              <Checkbox
                className="some-class"
                disabled
                id="checkbox-3"
                indeterminate={false}
                labelText="Extend compute"
                onChange={function noRefCheck(){}}
              />
            </div>
            <h4 className="new__form__heading"><span style={{paddingTop:"2rem"}}>Collaborator Restrictions</span></h4>
            <NumberInput
              className="some-class"
              id="number-input-1"
              label="Collaborators"
              max={100}
              min={0}
              step={1}
              value={1}
            />
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
                <Link className="new__footer__pageBtn__nextLink" to="/projects3">Next</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects2;
