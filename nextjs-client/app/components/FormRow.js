import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="flex flex-col gap-4 w-[500px] mx-auto">
      <label htmlFor={name}>{labelText || name}</label>
      <input type={type} value={value} name={name} onChange={handleChange} />
    </div>
  );
};

export default FormRow;
