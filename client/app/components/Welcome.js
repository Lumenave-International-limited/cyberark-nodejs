import React from "react";
import "../components/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className="container-fluid home">
      <div className="row p-5" style={{ width: "100%", height: "100%" }}>
        <div className="nav">
          <div className="logo">
            <Link href={'/'}>
            <FontAwesomeIcon
              icon={faHouse}
              style={{ fontSize: 40, color: "#3B71CA" }}
            />
            </Link>
          </div>
          <div className="join">
            <Link href={"/register"} className="btn btn-dark text-info">
              Join Us
            </Link>
          </div>
        </div>
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
            <div className="image"></div>
            <div className="icon">
              {/* <FontAwesomeIcon
                icon={faShieldVirus}
                style={{ fontSize: 100, color: "white" }}
              /> */}
            </div>
          </div>
        </div>
        <div className="col-7"></div>
      </div>
    </div>
  );
};

export default Welcome;
