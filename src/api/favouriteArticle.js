import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/?favorited=";

export const Favourite = async (page, username) => {
  try {
    const res = await axios.get(
      `${url}${username}&limit=10&offset=${(page - 1) * 10}`
    );
    return res.data;
  } catch (e) {
    return e.response;
  }
};
