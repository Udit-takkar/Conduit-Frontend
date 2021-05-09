import React from "react";
import axios from "axios";

const url = "https://conduit.productionready.io/api/articles?author=";
export const myArticles = async (page, username) => {
  console.log(page, username);
  try {
    const res = await axios.get(
      `${url}${username}&limit=10&offset=${(page - 1) * 10}`
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};
