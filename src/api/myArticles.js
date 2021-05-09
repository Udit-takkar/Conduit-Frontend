import React from "react";
import axios from "axios";

const url = "https://conduit.productionready.io/api/articles?author=";
export const myArticles = async (username) => {
  try {
    const res = await axios.get(`${url}${username}`);

    return res.data;
  } catch (e) {
    return e.response;
  }
};
