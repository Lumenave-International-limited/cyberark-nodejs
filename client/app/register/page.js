"use client";

import { useState, useEffect } from "react";
import { Alert, FormRow } from "../components/Index";
import { useAppContext } from "../context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  account: "",
  staffId: "",
  gender: "",
  department: "",
  isMember: true,
};

const Register = () => {
  const route = useRouter();
  const [values, setValues] = useState(initialState);

  // global state and useNavigate

  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      firstName,
      lastName,
      password,
      account,
      staffId,
      gender,
      department,
      isMember,
    } = values;

    if (
      !email ||
      (!isMember && !firstName) ||
      (!isMember && !lastName) ||
      !password ||
      (!isMember && !account) ||
      (!isMember && !staffId) ||
      (!isMember && !gender) ||
      (!isMember && !department)
    ) {
      displayAlert();
      return;
    }
    const currentUser = {
      email,
      firstName,
      lastName,
      password,
      account,
      staffId,
      gender,
      department,
    };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        route.push("/dashboard");
      }, 3000);
    }
  }, [user, route]);

  return (
    <div className="register">
      <div className="row p-5">
        <div className="logo">
          <Link href={"/"}>
            <FontAwesomeIcon
              icon={faHouse}
              style={{ fontSize: 40, color: "#3B71CA" }}
            />
          </Link>
        </div>
        <div className="col-6 p-5">
          <div className="form p-3">
            <div className="form-body">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center font-weight-italic">
                  <b>{values.isMember ? "Login" : "Register"}</b>
                </h1>
                {showAlert && <Alert />}
                {/* firstName Input */}

                {!values.isMember && (
                  <FormRow
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    handleChange={handleChange}
                  />
                )}
                {/* lastName Input */}
                {!values.isMember && (
                  <FormRow
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    handleChange={handleChange}
                  />
                )}
                {/* email Input */}
                <FormRow
                  type="email"
                  name="email"
                  value={values.email}
                  handleChange={handleChange}
                />
                {/* password Input */}
                <FormRow
                  type="password"
                  name="password"
                  value={values.password}
                  handleChange={handleChange}
                />
                {/* account Input */}
                {!values.isMember && (
                  <FormRow
                    type="text"
                    name="account"
                    value={values.account}
                    handleChange={handleChange}
                  />
                )}
                {/* staffId Input */}
                {!values.isMember && (
                  <FormRow
                    type="text"
                    name="staffId"
                    value={values.staffId}
                    handleChange={handleChange}
                  />
                )}
                {/* gender Input */}
                {!values.isMember && (
                  <FormRow
                    type="text"
                    name="gender"
                    value={values.gender}
                    handleChange={handleChange}
                  />
                )}

                {/* department Input */}

                {!values.isMember && (
                  <FormRow
                    type="text"
                    name="department"
                    value={values.department}
                    handleChange={handleChange}
                  />
                )}
                <button className="btn btn-primary">Submit</button>
              </form>
              <p>
                {values.isMember ? "Not a member yet?" : "Already a member?"}
                <button
                  type="button"
                  onClick={toggleMember}
                  className="btn"
                  disabled={isLoading}
                >
                  {values.isMember ? <span>Register</span> : <span>Login</span>}
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default Register;
