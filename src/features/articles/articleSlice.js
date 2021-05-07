import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  articles: [],
  articlesCount: 0,
  navItems: ["Your Feed", "Global Feed"],
};

const FeedArticlesURL =
  "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0";
const globalURL =
  "https://conduit.productionready.io/api/articles?limit=10&offset=0";
const tagURL = "https://conduit.productionready.io/api/articles?tag=";

export const fetchFeedArticles = createAsyncThunk("articles/feed", async () => {
  const token = JSON.stringify(localStorage.getItem("token"));
  try {
    const response = await axios.get(FeedArticlesURL, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
});
export const fetchGlobalArticles = createAsyncThunk(
  "articles/global",
  async () => {
    try {
      const response = await axios.get(globalURL);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
);

export const fetchArticlesByTag = createAsyncThunk(
  "articles/tag",

  async (tag, { getState, dispatch }) => {
    console.log(getState().articleSlice.navItems);

    try {
      const response = await axios.get(`${tagURL}${tag}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

// const addTag=(state,tag)=>{
//   console.log(state)
// }

export const articleSlice = createSlice({
  name: "articles",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchFeedArticles.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
    [fetchFeedArticles.fulfilled]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
    [fetchFeedArticles.rejected]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: action.error,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
    [fetchGlobalArticles.pending]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: true,
        error: null,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
    [fetchGlobalArticles.fulfilled]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
    [fetchGlobalArticles.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: action.error,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
    [fetchArticlesByTag.pending]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: true,
        error: null,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
    [fetchArticlesByTag.fulfilled]: (state, action) => {
      let updateNavItems = state.navItems;
      if (state.navItems.length === 3) {
        updateNavItems[2] = action.meta.arg;
      } else {
        updateNavItems = [...updateNavItems, action.meta.arg];
      }

      Object.assign(state, {
        loading: false,
        error: null,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        navItems: updateNavItems,
      });
      console.log(state);
    },
    [fetchArticlesByTag.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: null,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
      });
    },
  },
});

export const getArticles = (state) => {
  return state.articleSlice.articles;
};
export const getArticlesCount = (state) => state.articleSlice.articlesCount;
export const loading = (state) => state.articleSlice.loading;
export const navItems = (state) => state.articleSlice.navItems;
export default articleSlice.reducer;