import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";
export const isFavourite = async (slug) => {
  const token = JSON.stringify(localStorage.getItem("token"));
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
