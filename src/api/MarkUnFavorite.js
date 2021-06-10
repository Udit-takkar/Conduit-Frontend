import axios from "axios";
import { getToken } from "./Token";

const url = "https://conduit.productionready.io/api/articles/";

export const MarkUnFavourite = async (slug) => {
  console.log(slug);
  const token = getToken();

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
