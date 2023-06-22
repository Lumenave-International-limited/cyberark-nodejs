"use client";

import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltUp,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const route = useRouter();
  const { user, logoutUser } = useAppContext();

  useEffect(() => {
    if (!user) route.push("/");
  }, [user, route]);

  return (
    <div>
      <div className="header p-2">
        <button className="btn btnx" onClick={logoutUser}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ fontSize: 40, color: "#fff" }}
          />
        </button>
        <div className="header-title">
          <div>
            <h1>
              Welcome {user?.firstName} {user?.lastName}
            </h1>
            <p style={{ textAlign: "center" }}>
              Kindly view your profile below:
            </p>
          </div>
        </div>
      </div>
      <div className="profile">
        <h2 style={{ textAlign: "center" }}>User's Profile</h2>
        <p className="profile-body">
          <span>First Name:</span> {user?.firstName}
        </p>
        <p className="profile-body">
          <span>Last Name:</span> {user?.lastName}
        </p>
        <p className="profile-body">
          <span>Staff ID:</span> {user?.staffId}
        </p>
        <p className="profile-body">
          <span>Account Number:</span> {user?.account}
        </p>
        <p className="profile-body">
          <span>Gender:</span> {user?.gender}
        </p>
        <p className="profile-body">
          <span>Department:</span> {user?.department}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
