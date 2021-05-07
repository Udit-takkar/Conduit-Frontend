import React from "react";
import axios from "axios";

const url = "https://conduit.productionready.io/api/user";

export const updateUser = async (
  { username, password, email, image, bio },
  { rejectWithValue }
) => {
  const token = JSON.stringify(localStorage.getItem("token"));
  try {
    const res = await axios.patch(
      url,
      {
        user: {
          username,
          email,
          password,
          image,
          bio,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e.response.data.errors);
    return rejectWithValue(e.response.data.errors);
  }
};
