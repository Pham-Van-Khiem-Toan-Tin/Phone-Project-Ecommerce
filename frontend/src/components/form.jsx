import React, { useEffect, useState } from "react";
import { validateEmail, validateName } from "../validate/validate";
const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [first, setfirst] = useState('');
  useEffect(() => {
    validateEmail({email, setEmailError});
    validateName({name, setNameError})
  }, [name, email]);
  console.log(nameError);
  console.log(emailError);
  return (
    <div>
      <form method="POST" action="http://localhost:8000/login">
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="inputName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="inputEmail"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            id="inputPassword"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="remeberMe" />
          <label className="form-check-label" htmlFor="remeberMe">
            Remembre me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
