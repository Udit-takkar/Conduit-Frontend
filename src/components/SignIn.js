import React, { useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import { login } from "../features/authentication/signup";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  isUserLoggedIn,
  error,
} from "../features/authentication/signup";

function SignIn() {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const isLoggedIn = useSelector(isUserLoggedIn);
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    dispatch(login(formState));
  };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to="/" />
      ) : (
        <SignInContainer>
          <Header />
          <SignInForm>
            <h3>Sign In</h3>
            <Link to="/" style={needaccount}>
              Need a account
            </Link>
            <input
              name="email"
              onChange={handleChange}
              value={formState.email}
              type="email"
              placeholder="Email"
            />
            <input
              name="password"
              onChange={handleChange}
              value={formState.password}
              type="password"
              placeholder="Password"
            />
            <button onChange={handleChange} onClick={handleSubmit}>
              Sign In
            </button>
          </SignInForm>
        </SignInContainer>
      )}
    </>
  );
}
const SignInContainer = styled.div``;
const SignInForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h3 {
    font-weight: 500;
    line-height: 1.1;
    font-size: 35px;
  }
  > input {
    padding: 1.25rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 35vw;
  }
  > button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    color: #fff;
    background-color: #5cb85c;
    border-color: #5cb85c;
    border: none;
    margin-top: 15px;
    cursor: pointer;
  }
`;
const needaccount = {
  textDecoration: "none",
  fontSize: "15px ",
  color: "#5cb85c",
};
export default SignIn;
