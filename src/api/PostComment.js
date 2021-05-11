import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";

export const postComment = async (slug, body) => {
  console.log(slug, body);
  const token = JSON.stringify(localStorage.getItem("token"));
  try {
    const res = await axios.post(
      `${url}${slug}/comments`,
      {
        comment: {
          body,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    return err.response;
  }
};
