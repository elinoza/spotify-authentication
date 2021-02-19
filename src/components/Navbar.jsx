import React from "react";
import { Nav } from "react-bootstrap";
import NavbarData from "./NavbarData";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        <Nav className="navbar-items">
          <ul>
            {NavbarData.map((prop, key) => {
              return (
                <li key={key}>
                  <span
                    className="mx-3"
                    onClick={() => this.props.history.push(prop.link)}
                  >
                    {prop.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </Nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
