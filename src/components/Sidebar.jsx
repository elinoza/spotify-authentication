import React from "react";
import { Button } from "@material-ui/core";
import { Image } from "react-bootstrap";
import SidebarData from "./SidebarData";
import logo from "../logo/Spotify_Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";

class Sidebar extends React.Component {
  render() {
    return (
      <>
        <div className="sidebar">
          <div id="sidebar-logo-wrapper">
            <Image src={logo} id="sidebar-logo" />
          </div>
          <ul className="sidebar-list ml-5">
            {SidebarData.map((prop, key) => {
              return (
                <li
                  key={key}
                  id={
                    this.props.location.pathname === prop.link ? "active" : ""
                  }
                  onClick={() => {

                    this.props.history.push(prop.link);
                  }}
                  className="sidebar-item"
                >
                  <div id="sidebar-icon">{prop.icon}</div>{" "}
                  <div className="sidebar-item-name">{prop.title}</div>
                </li>
              );
            })}
          </ul>
          <div id="sidebar-buttons">
            <div className="d-flex justify-content-center mb-3">
              <Button
                onClick={() => {
                  window.location.pathname = "/signup";
                }}
                variant="light"
                id="signup"
              >
                Sign Up
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button variant="light" id="login">
                Login
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Sidebar);
