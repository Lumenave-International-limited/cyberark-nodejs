"use client";

import { useState, useEffect } from "react";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  account: "",
  staffId: "",
  gender: "",
  department: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  //global state and useNavigate

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
        <h3 className="mb-4 border-b-4 border-black">Login</h3>
        {/* email Input */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={values.email}
            name="name"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
