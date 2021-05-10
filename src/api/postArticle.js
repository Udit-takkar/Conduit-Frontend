import React from "react";
import axios from "axios";

const url = "https://conduit.productionready.io/api/articles";

export const postArticle = async ({ title, description, body, tagList }) => {
  const token = JSON.stringify(localStorage.getItem("token"));
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
    return err.response;
  }
};