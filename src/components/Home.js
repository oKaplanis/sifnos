import React from "react";
import Welcome from "./Welcome";


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <nav className="nav navbar-expand-lg navbar-light ">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <a href="#" className="navbar-brand">
                  Dataverse
                </a>
              </div>
              <div className="col-md-4">
                <a href="#">Logout</a>
              </div>
              <div className="col-md-4">

                <a href="/form">Form</a>
              </div>
            </div>
          </div>
        </nav>
        <Welcome />
      </div>
    );
  }
}
