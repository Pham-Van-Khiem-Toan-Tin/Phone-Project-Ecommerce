import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./input-password.css";
const InputPass = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    props.onChange(e);
  };
  return (
    <div className="input-password">
      <label htmlFor={props.id}>
        {props.title}: <span className="text-danger">*</span>
      </label>
      <div className="input-password-content">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
          className="form-control input-pass"
          minLength={8}
          name={props.name ? props.name : ""}
          value={props.value}
          onChange={handleChange}
          id={props.id}
          required
        />
        <div onClick={toggleShowPassword} className="eye-icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
    </div>
  );
};

export default InputPass;
