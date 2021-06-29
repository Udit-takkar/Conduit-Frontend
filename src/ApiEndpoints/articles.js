import axios from "../config/api.config";

export const getArticleBySlug = async (slug) => {
  try {
    const res = await axios.get(`/articles/${slug}`);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const getCommentsBySlug = async (slug) => {
  try {
    const res = await axios.get(`/articles/${slug}/comments`);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const deleteArticle = async (slug) => {
  try {
    const res = await axios.delete(`/articles/${slug}`);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const DeleteComment = async (slug, id) => {
  console.log(slug, id);

  try {
    const res = await axios.delete(`/articles/${slug}/comments/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const Favourite = async (page, username) => {
  try {
    const res = await axios.get(
      `/articles/?favorited=${username}&limit=10&offset=${(page - 1) * 10}`
    );
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const isFavourite = async (slug) => {
  // const token = getToken();
  try {
    const res = await axios.get(`/articles/${slug}`);
    return res.data;
  } catch (err) {
    return err.response;
  }
};
export const MarkFavourite = async (slug) => {
  console.log(slug);

  try {
    const res = await axios.post(`/articles/${slug}/favorite`);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const MarkUnFavourite = async (slug) => {
  console.log(slug);

  try {
    const res = await axios.delete(`/articles/${slug}/favorite`);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const myArticles = async (page, username) => {
  console.log(page, username);
  try {
    const res = await axios.get(
      `/articles/?author=${username}&limit=10&offset=${(page - 1) * 10}`
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const postArticle = async ({ title, description, body, tagList }) => {
  try {
    const res = await axios.post("/articles", {
      article: {
        title,
        description,
        body,
        tagList,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
};

export const postComment = async (slug, body) => {
  try {
    const res = await axios.post(`/articles/${slug}/comments`, {
      comment: {
        body,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const updateArticle = async (slug, formState) => {
  try {
    const res = await axios.put(`/articles/${slug}`, {
      article: {
        title: formState.title,
        description: formState.description,
        body: formState.body,
        tagList: formState.tagList,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    return e.response;
  }
};
