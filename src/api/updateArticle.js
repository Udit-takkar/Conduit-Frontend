import axios from "axios";

const url = "https://conduit.productionready.io/api/articles/";
export const updateArticle = async (slug, formState) => {
  const token = JSON.stringify(localStorage.getItem("token"));
  try {
    const res = await axios.put(
      `${url}${slug}`,
      {
        article: {
          title: formState.title,
          description: formState.description,
          body: formState.body,
          tagList: formState.tagList,
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
  } catch (e) {
    console.log(e);
    return e.response;
  }
};
