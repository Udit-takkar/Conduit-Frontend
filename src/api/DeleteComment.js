import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";

export const DeleteComment = async (slug, id) => {
  console.log(slug, id);
  const token = JSON.stringify(localStorage.getItem("token"));
  try {
    const res = await axios.delete(
      `${url}${slug}/comments/${id}`,

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
