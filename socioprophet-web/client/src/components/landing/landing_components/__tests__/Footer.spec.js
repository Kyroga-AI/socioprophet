import React from "react";
import "../../../../../setupTests";
import { shallow } from "enzyme";
import Footer from "../Footer.js";

/**
 *
 *  handle statics
 *
 */
jest.mock("../styles/footer.css", () => {
  return {};
});

/**
 *
 *  quick placeholder test - footer rendered from snapshot
 *
 */
describe("Footer", () => {
  it("should render correctly", () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
