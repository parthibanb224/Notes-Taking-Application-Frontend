import React from "react";

export default function TextInput({
  label = "",
  type = "",
  id = "",
  placeholder = "",
  value = "",
  onChange = (e) => { },
  disabled = false,
  required = false,
}) {
  return (
    <div className="mb-3 text-start">
      <label className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}
