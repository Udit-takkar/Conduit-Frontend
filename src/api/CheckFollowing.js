import axios from "axios";

const url = "https://conduit.productionready.io/api/profiles/";

export const CheckFollowing = async (username) => {
  const token = JSON.stringify(localStorage.getItem("token"));

  try {
    const res = await axios.get(
      `${url}${username}`,

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
