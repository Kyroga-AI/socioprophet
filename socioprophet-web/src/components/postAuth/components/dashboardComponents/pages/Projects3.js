import React, { Component } from "react";
import Form from "carbon-components-react/lib/components/Form";
import FormLabel from "carbon-components-react/lib/components/FormLabel";
import Toggle from "carbon-components-react/lib/components/Toggle";
import Select from "carbon-components-react/lib/components/Select";
import SelectItem from "carbon-components-react/lib/components/SelectItem";
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
          <Form
            className="new__form"
            onSubmit={function noRefCheck(){}}
          >
            <h4 className="new__form__heading">Preferences</h4>
            <div style={{ marginBottom : "2rem" }}>
            <Toggle
              aria-label="Toggle"
              className="some-class"
              defaultToggled={true}
              id="toggle-1"
              labelA="Off"
              labelB="On"
              onToggle={function noRefCheck(){}}
            />
            <Toggle
              aria-label="Toggle"
              className="some-class"
              defaultToggled={false}
              id="toggle-2"
              labelA="Off"
              labelB="On"
              onToggle={function noRefCheck(){}}
            />
            <Toggle
              aria-label="Toggle"
              className="some-class"
              defaultToggled={false}
              id="toggle-3"
              labelA="Off"
              labelB="On"
              onToggle={function noRefCheck(){}}
            />
            </div>
            <h4 className="new__form__heading"><span style={{paddingTop:"2rem"}}>Cluster Options</span></h4>
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
                <Link className="new__footer__pageBtn__nextLink" to="/dashboard">Next</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects3;
