import axios from "axios";

const URL = "https://conduit.productionready.io/api/tags";

export const getTags = async () => {
  try {
    const res = await axios.get(URL, {
      headers: {
        accepts: "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
