import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="container my-3">
      <label htmlFor={name}>{labelText || name}</label>
      <input className="form-control" type={type} value={value} name={name} onChange={handleChange} />
    </div>
  );
};

export default FormRow;
