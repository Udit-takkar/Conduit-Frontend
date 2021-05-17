import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  articles: [],
  articlesCount: 0,
  navItems: ["Your Feed", "Global Feed"],
  activeItem: "Global Feed",
};

const FeedArticlesURL =
  "https://conduit.productionready.io/api/articles/feed?limit=10&offset=";
const globalURL =
  "https://conduit.productionready.io/api/articles?limit=10&offset=";
const tagURL = "https://conduit.productionready.io/api/articles?tag=";

export const fetchFeedArticles = createAsyncThunk(
  "articles/feed",
  async (page) => {
    const token = JSON.stringify(localStorage.getItem("token"));
    try {
      const response = await axios.get(`${FeedArticlesURL}${(page - 1) * 10}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  }
);
export const fetchGlobalArticles = createAsyncThunk(
  "articles/global",
  async (page) => {
    try {
      const response = await axios.get(`${globalURL}${(page - 1) * 10}`);
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

  async ({ page, tag }) => {
    // console.log(getState().articleSlice.navItems);
    console.log(page, tag);
    try {
      const response = await axios.get(
        `${tagURL}${tag}&limit=10&offset=${(page - 1) * 10}`
      );
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
        activeItem: "Your Feed",
      });
    },
    [fetchFeedArticles.fulfilled]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        navItems: ["Your Feed", "Global Feed"],
        activeItem: "Your Feed",
      });
    },
    [fetchFeedArticles.rejected]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: action.error,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
        activeItem: "Your Feed",
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
        activeItem: "Global Feed",
      });
    },
    [fetchGlobalArticles.fulfilled]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        navItems: ["Your Feed", "Global Feed"],
        activeItem: "Global Feed",
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
        activeItem: "Global Feed",
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
        activeItem: "Global Feed",
      });
    },
    [fetchArticlesByTag.fulfilled]: (state, action) => {
      let updateNavItems = state.navItems;

      if (state.navItems.length === 3) {
        // check if a tag tab is already open
        updateNavItems[2] = action.meta.arg.tag; //Just replace it with new tag
      } else {
        updateNavItems = [...updateNavItems, action.meta.arg.tag];
      }
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: null,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        navItems: updateNavItems,
        activeItem: action.meta.arg.tag,
      });
    },
    [fetchArticlesByTag.rejected]: (state, action) => {
      console.log(action);
      Object.assign(state, {
        loading: false,
        error: null,
        articles: [],
        articlesCount: 0,
        navItems: ["Your Feed", "Global Feed"],
        activeItem: action.meta.arg.tag,
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
export const activeItem = (state) => state.articleSlice.activeItem;
export default articleSlice.reducer;
