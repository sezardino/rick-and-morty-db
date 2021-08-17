import { Module } from "vuex";
import { IRootState, SearchStateTypes } from "../interfaces";
import { ICharacter } from "@/interfaces";

import { getItemsInRange } from "@/helpers/functions";
import gqlApi from "@/api/gqlApi";

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
    setItems(state, payload: ICharacter[]) {
      state.items = payload;
    },
    resetItems(state) {
      state.items = [];
    },
    setTotalPages(state, payload) {
      state.totalPages = payload;
    },
    setCurrentPage(state, payload) {
      return (state.currentPage = payload);
    },
    setPageData(state, payload) {
      return (state.pageData = payload);
    },
    setQuery(state, payload) {
      state.query = payload;
    },
  },
  getters: {
    items(state) {
      return state.items;
    },
    pageData(state) {
      return state.pageData;
    },
    totalPages(state) {
      return state.totalPages;
    },
    currentPage(state) {
      return state.currentPage;
    },
    query(state) {
      return state.query;
    },
  },
  actions: {
    async init({ commit, dispatch }, query) {
      commit("setCurrentPage", 1);
      commit("setTotalPages", 0);
      commit("resetItems");

      commit("setQuery", query);
      await dispatch("getData");
      dispatch("showHandler");
    },

    async getData({ commit, getters, rootGetters }) {
      const query = getters.query;
      const totalCount = await gqlApi.getSearchCount(query);

      const pagesCount = Math.floor(totalCount / rootGetters["app/perPage"]);
      commit("setTotalPages", pagesCount);

      const items = await gqlApi.getSearchData(query, totalCount);
      commit("setItems", items);
    },

    async changePageHandler({ commit, dispatch }, page) {
      commit("setCurrentPage", page);

      dispatch("showHandler");
    },

    async getCount({ commit, getters, rootGetters }) {
      const query = getters.query;
      const totalCount = await gqlApi.getSearchCount(query);

      const pagesCount = Math.floor(totalCount / rootGetters["app/perPage"]);

      commit("setTotalPages", pagesCount);
    },

    getItems({ getters, rootGetters }, page) {
      const items = getItemsInRange(
        {
          page: page,
          limit: rootGetters["app/perPage"],
          items: getters.items,
        },
        true
      );

      return items;
    },

    async showHandler({ commit, dispatch, getters }) {
      const page = getters.currentPage;
      const items = await dispatch("getItems", page);

      commit("setPageData", items);
    },

    async changePage({ commit, dispatch }, page) {
      commit("setCurrentPage", page);

      dispatch("showHandler");
    },
  },
};

export default search;
