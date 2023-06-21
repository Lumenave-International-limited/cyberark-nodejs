import React from "react";
import "../components/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmbulance, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  return (
    <div className="container-fluid p-5 home">
      <div className="row" style={{ width: "100%", height: "100%" }}>
        <div className="col-5">
          <div className="title">
            <div className="title-body">
              <h1>Welcome To CyberArk Identity Management</h1>
              <p>
                Seamlessly secure identities throughout the cycle of accessing
                any resource across any infrastructure, including hybrid, SaaS
                and multi-cloud.
              </p>
            </div>
          </div>
          <div className="body">
            <div className="image bg-success"></div>
            <div className="icon bg-primary">
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ fontSize: 100, color: "orange" }}
              />
            </div>
          </div>
        </div>
        <div className="col-7"></div>
      </div>
    </div>
  );
};

export default Welcome;
