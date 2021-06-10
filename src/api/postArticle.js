import React from "react";
import axios from "axios";
import { getToken } from "./Token";

const url = "https://conduit.productionready.io/api/articles";

export const postArticle = async ({ title, description, body, tagList }) => {
  const token = getToken();
  try {
    const res = await axios.post(
      url,
      {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};
