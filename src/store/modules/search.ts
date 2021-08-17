import { Module } from "vuex";
import { IRootState, SearchStateTypes } from "../interfaces";
import gqlApi from "@/api/gqlApi";
import {
  setItems,
  setTotalPages,
  setCurrentPage,
  setPageData,
} from "./../helpers/commonMutations";
import {
  items,
  pageData,
  totalPages,
  currentPage,
} from "./../helpers/commonGetters";
import {
  prepareItemsForPage,
  showPageHandler,
  changePageHandler,
} from "../helpers/commonActions";

const search: Module<SearchStateTypes, IRootState> = {
  namespaced: true,
  state: {
    query: "",
    items: [],
    pageData: [],
    totalPages: 0,
    currentPage: 1,
  },
  mutations: {
    setItems,
    setTotalPages,
    setCurrentPage,
    setPageData,
    resetItems(state) {
      state.items = [];
    },
    setQuery(state, payload) {
      state.query = payload;
    },
  },
  getters: {
    items,
    pageData,
    totalPages,
    currentPage,
    query(state) {
      return state.query;
    },
  },
  actions: {
    prepareItemsForPage,
    showPageHandler,
    changePageHandler,
    async init({ commit, dispatch }, query) {
      commit("setCurrentPage", 1);
      commit("setTotalPages", 0);
      commit("resetItems");

      commit("setQuery", query);
      await dispatch("getData");
      dispatch("showPageHandler");
    },

    async getData({ commit, getters, rootGetters }) {
      const query = getters.query;
      const totalCount = await gqlApi.getSearchCount(query);

      const pagesCount = Math.ceil(totalCount / rootGetters["app/perPage"]);
      commit("setTotalPages", pagesCount);

      const items = await gqlApi.getSearchData(query, totalCount);
      commit("setItems", items);
    },
  },
};

export default search;
