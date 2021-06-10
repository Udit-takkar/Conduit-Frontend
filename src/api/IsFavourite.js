import axios from "axios";
import { getToken } from "./Token";

const url = "https://conduit.productionready.io/api/articles/";
export const isFavourite = async (slug) => {
  const token = getToken();
  try {
    const res = await axios.get(`${url}${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};
