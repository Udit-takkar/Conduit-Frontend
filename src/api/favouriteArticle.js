import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/?favorited=";

export const Favourite = async (username) => {
  try {
    const res = await axios.get(`${url}${username}`);
    return res.data;
  } catch (e) {
    return e.response;
  }
};
