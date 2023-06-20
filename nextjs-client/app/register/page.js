"use client";

import { useState, useEffect } from "react";
import { Alert, FormRow } from "../components/Index";

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
  showAlert: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  // global state and useNavigate

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    console.log(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);
  };
  return (
    <div className="mx-auto my-40 text-center ">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4 border-b-4 border-black">
          {values.isMember ? "Login" : "Register"}
        </h3>
        {values.showAlert && <Alert />}
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

        {/* department Input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="department"
            value={values.department}
            handleChange={handleChange}
          />
        )}

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
      <p>
        {values.isMember ? "Not a member yet?" : "Already a member?"}
        <button type="button" onClick={toggleMember} className="ml-2">
          {values.isMember ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Register;
