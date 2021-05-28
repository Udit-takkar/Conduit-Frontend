import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { login } from "../features/authentication/signup";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  isUserLoggedIn,
  error,
} from "../features/authentication/signup";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const isLoggedIn = useSelector(isUserLoggedIn);
  const err = useSelector(error);
  const loading = useSelector(isLoading);
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  // const [err, setErr] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(login(formState));
  };

  useEffect(() => {
    if (isLoggedIn === true) history.push("/");
  });

  return (
    <>
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

          <h3>SIGN IN</h3>
          <Link to="/signup" style={needaccount}>
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
          {err && err.page === "signin" && (
            <>
              {Object.entries(err.error).map(([key, val]) => {
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
          <button onChange={handleChange} onClick={handleSubmit}>
            Sign In
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
  margin-top: 4rem;
  > h3 {
    font-weight: 400;
    line-height: 1.1;
    font-size: 45px;
  }
  > input {
    padding: 1.25rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 30vw;
    font-size: 1.05em;
  }
  > button {
    display: inline-block;
    padding: 1rem 2rem;
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

const LoadingSpin = styled.div`
  position: absolute;
`;
export default SignIn;
