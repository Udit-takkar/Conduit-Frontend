import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";
export const deleteArticle = async (slug) => {
  const token = JSON.stringify(localStorage.getItem("token"));

  try {
    const res = await axios.delete(`${url}${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    return e.response;
  }
};
