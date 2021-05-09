import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";

export const MarkFavourite = async (slug) => {
  console.log(slug);
  const token = JSON.stringify(localStorage.getItem("token"));

  try {
    const res = await axios.post(
      `${url}${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    return e.response;
  }
};
