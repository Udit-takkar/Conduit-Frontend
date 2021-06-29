import axios from "../config/api.config";
// import { getToken } from "./Token";

const url = "https://conduit.productionready.io/api/articles/";
export const isFavourite = async (slug) => {
  // const token = getToken();
  try {
    const res = await axios.get(`${url}${slug}`);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const MarkFavourite = async (slug) => {
  console.log(slug);

  try {
    const res = await axios.post(`/articles/${slug}/favorite`);
    return res.data;
  } catch (e) {
    return e.response;
  }
};
