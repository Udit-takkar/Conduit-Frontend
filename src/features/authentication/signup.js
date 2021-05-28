import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateUser } from "../../api/updateUser";

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  username: "",
  email: "",
  bio: "",
  image: null,
};
const registerURL = "https://conduit.productionready.io/api/users";
const loginURL = "https://conduit.productionready.io/api/users/login";

export const signup = createAsyncThunk(
  "signup/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(registerURL, {
        user: {
          username,
          email,
          password,
        },
      });
      localStorage.setItem("token", res.data.user.token);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const login = createAsyncThunk(
  "signup/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(loginURL, {
        user: {
          email,
          password,
        },
      });

      localStorage.setItem("token", res.data.user.token);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

export const update = createAsyncThunk("signup/update", updateUser);

export const SignUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: false,
        username: "",
        email: "",
        bio: "",
        image: null,
      });
    },
  },
  extraReducers: {
    [signup.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
        username: "",
        email: "",
        bio: "",
        image: null,
      });
    },
    [signup.fulfilled]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
        username: action.payload.user.username,
        email: action.payload.user.email,
        bio: action.payload.user.bio,
        image: action.payload.user.image,
      });
    },
    [signup.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: { page: "signup", error: action.payload.data.errors },
        isLoggedIn: false,
        username: "",
        email: "",
        bio: "",
        image: null,
      });
    },
    [login.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
        username: "",
        email: "",
        bio: "",
        image: null,
      });
    },
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
        username: action.payload.user.username,
        email: action.payload.user.email,
        bio: action.payload.user.bio,
        image: action.payload.user.image,
      });
    },
    [login.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: { page: "signin", error: action.payload.data.errors },
        isLoggedIn: false,
        username: "",
        email: "",
        bio: "",
        image: null,
      });
    },
    [update.pending]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
        username: "",
        email: "",
        bio: "",
        image: null,
      });
    },
    [update.fulfilled]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
        username: action.payload.user.username,
        email: action.payload.user.email,
        bio: action.payload.user.bio,
        image: action.payload.user.image,
      });
    },
    [update.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: { page: "update", error: action.payload.data.errors },
        isLoggedIn: false,
        username: "",
        email: "",
        bio: "",
        image: null,
      });
    },
  },
});

export const isUserLoggedIn = (state) => state.signup.isLoggedIn;
export const isLoading = (state) => state.signup.loading;
export const error = (state) => {
  return state.signup.error;
};
export const getUsername = (state) => state.signup.username;
export const getUserEmail = (state) => state.signup.email;
export const getUserImg = (state) => state.signup.image;
export const getUserBio = (state) => state.signup.bio;
export const { logoutUser } = SignUpSlice.actions;
export default SignUpSlice.reducer;
