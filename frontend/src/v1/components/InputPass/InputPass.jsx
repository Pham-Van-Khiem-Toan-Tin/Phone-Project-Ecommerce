import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const InputPass = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    props.onChange(e);
  }
  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder}
        className="input"
        name={props.name ? props.name : ""}
        value={props.value}
        onChange={handleChange}
        required
      />
      <span onClick={toggleShowPassword} className="eye-icon">
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </>
  );
};

export default InputPass;
