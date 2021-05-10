import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";

export const followUser = async (username) => {
  const token = JSON.stringify(localStorage.getItem("token"));

  try {
    const res = await axios.post(
      `${url}${username}/follow`,
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
