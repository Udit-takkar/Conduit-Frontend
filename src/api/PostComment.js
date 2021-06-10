import axios from "axios";
import { getToken } from "./Token";

const url = "https://conduit.productionready.io/api/articles/";

export const postComment = async (slug, body) => {
  const token = getToken();
  try {
    const res = await axios.post(
      `${url}${slug}/comments`,
      {
        comment: {
          body,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    return err.response;
  }
};
