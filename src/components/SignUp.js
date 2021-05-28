import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/authentication/signup";
import {
  isLoading,
  isUserLoggedIn,
  error,
} from "../features/authentication/signup";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  let btnRef = useRef();

  const [isDisabled, setIsDisabled] = useState(false);
  const loading = useSelector(isLoading);
  const isLoggedIn = useSelector(isUserLoggedIn);
  const checkError = useSelector(error);

  useEffect(() => {
    if (isLoggedIn === true) {
      history.push("/");
    }
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    await dispatch(signup(formState));
    btnRef.current.removeAttribute("disabled");
  };
  return (
    <>
      {
        <SignInContainer>
          <SignInForm>
            <LoadingSpin>
              {loading === true && (
                <Loader
                  type="TailSpin"
                  color="#5cb85c"
                  height={50}
                  width={50}
                  style={{ marginTop: "50px" }}
                />
              )}
            </LoadingSpin>

            <h3>Sign Up</h3>
            <Link to="/signin" style={link}>
              Have an account?
            </Link>
            <input
              onChange={handleChange}
              name="username"
              value={formState.username}
              type="text"
              placeholder="Username"
            />
            <input
              onChange={handleChange}
              name="email"
              value={formState.email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              name="password"
              value={formState.password}
              type="password"
              placeholder="Password"
            />
            {checkError && checkError.page === "signup" && (
              <>
                {Object.entries(checkError.error).map(([key, val]) => {
                  return (
                    <>
                      <span style={{ color: "#ff0033", fontWeight: 500 }}>
                        {key} {val}
                      </span>
                    </>
                  );
                })}
              </>
            )}
            <button ref={btnRef} type="submit" onClick={handleSubmit}>
              Sign Up
            </button>
          </SignInForm>
        </SignInContainer>
      }
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
    :hover {
      cursor: pointer;
    }
    &:disabled {
      background-color: #5cb85b;
      cursor: not-allowed;
    }
  }
`;
const LoadingSpin = styled.div`
  position: absolute;
`;
const link = {
  textDecoration: "none",
  fontSize: "15px ",
  color: "#5cb85c",
};
export default SignUp;
