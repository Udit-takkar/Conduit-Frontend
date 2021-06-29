import axios from "../config/api.config";

export const updateUser = async (
  { username, password, email, image, bio },
  { rejectWithValue }
) => {
  try {
    const res = await axios.patch("/user", {
      user: {
        username,
        email,
        password,
        image,
        bio,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response.data.errors);
    return rejectWithValue(e.response.data.errors);
  }
};

export const registerUser = async (
  { username, email, password },
  { rejectWithValue }
) => {
  try {
    const res = await axios.post("/users", {
      user: {
        username,
        email,
        password,
      },
    });

    return res.data;
  } catch (e) {
    return rejectWithValue(e.response);
  }
};

export const loginUser = async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post("/users/login", {
      user: {
        email: email,
        password: password,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err.response);
    return rejectWithValue(err.response);
  }
};
