import React, { Component } from "react";
import Form from "carbon-components-react/lib/components/Form";
import Checkbox from "carbon-components-react/lib/components/Checkbox";
import Button from "carbon-components-react/lib/components/Button";
import Select from "carbon-components-react/lib/components/Select";
import SelectItem from "carbon-components-react/lib/components/SelectItem";
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
          <Form className="new__form" onSubmit={function noRefCheck() {}}>
            <h4 className="new__form__heading">Compute Options</h4>
            <div style={{ marginBottom: "2rem" }}>
              <Checkbox
                className="some-class"
                defaultChecked
                id="checkbox-0"
                indeterminate={false}
                labelText="Option 1"
                onChange={function noRefCheck() {}}
              />
              <Checkbox
                className="some-class"
                id="checkbox-1"
                indeterminate={false}
                labelText="Option 2"
                onChange={function noRefCheck() {}}
              />
              <Checkbox
                className="some-class"
                id="checkbox-2"
                indeterminate={false}
                labelText="Option 3"
                onChange={function noRefCheck() {}}
              />
            </div>

            <h4 className="new__form__heading">
              <span style={{ paddingTop: "2rem" }}>Cluster Options</span>
            </h4>
            <Select
              className="some-class"
              defaultValue="placeholder-item"
              disabled={false}
              helperText=""
              id="select-1"
              inline={false}
              invalid={false}
              invalidText=""
              labelText="Select"
              light={false}
            >
              <SelectItem
                disabled
                hidden
                text="Choose an option"
                value="placeholder-item"
              />
              <SelectItem
                disabled={false}
                hidden={false}
                text="Option 1"
                value="option-1"
              />
              <SelectItem
                disabled={false}
                hidden={false}
                text="Option 2"
                value="option-2"
              />
              <SelectItem
                disabled={false}
                hidden={false}
                text="Option 3"
                value="option-3"
              />
            </Select>
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
                  to="/projects3"
                >
                  Next
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects2;
