import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";

export const MarkUnFavourite = async (slug) => {
  console.log(slug);
  const token = JSON.stringify(localStorage.getItem("token"));

  try {
    const res = await axios.delete(
      `${url}${slug}/favorite`,

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
