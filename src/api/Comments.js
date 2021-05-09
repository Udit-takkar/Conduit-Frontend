import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";
export const getCommentsBySlug = async (slug) => {
  try {
    const res = await axios.get(`${url}${slug}/comments`);
    return res.data;
  } catch (err) {
    return err.response;
  }
};
