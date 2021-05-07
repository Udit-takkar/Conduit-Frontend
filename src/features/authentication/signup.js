import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
};
const registerURL = "https://conduit.productionready.io/api/users";
const loginURL = "https://conduit.productionready.io/api/users/login";

export const signup = createAsyncThunk(
  "signup/register",
  ({ username, email, password }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(registerURL, {
          user: {
            username,
            email,
            password,
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.user.token);
          console.log("Ho gya");
          resolve("Success registered");
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
);

export const login = createAsyncThunk("signup/login", ({ email, password }) => {
  return new Promise((resolve, reject) => {
    // const token = JSON.stringify(localStorage.getItem("token"));
    console.log("request");
    axios
      .post(
        loginURL,
        {
          user: {
            email,
            password,
          },
        }
        // {
        //   headers: {
        //     Authorization: `Token ${token}`,
        //   },
        // }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.user.token);
        resolve("Success");
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
});

export const SignUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [signup.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
      });
    },
    [signup.fulfilled]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
      });
    },
    [signup.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: action.error,
        isLoggedIn: false,
      });
    },
    [login.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
      });
    },
    [login.fulfilled]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
      });
    },
    [login.rejected]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: action.error,
        isLoggedIn: false,
      });
    },
  },
});

export const isUserLoggedIn = (state) => state.signup.isLoggedIn;
export const isLoading = (state) => state.signup.loading;
export const error = (state) => {
  return state.signup.error;
};
export default SignUpSlice.reducer;
