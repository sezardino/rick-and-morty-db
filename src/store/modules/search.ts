import { Module } from "vuex";
import { ActionContextType, IRootState, SearchStateTypes } from "../interfaces";
import { ICharacter } from "@/interfaces";

import { getItemsInRange } from "@/helpers/functions";
import gqlApi from "@/api/gqlApi";

const search: Module<SearchStateTypes, IRootState> = {
  namespaced: true,
  state: {
    query: "",
    allItems: [],
    pageData: [],
    totalPages: 0,
    currentPage: 1,
  },
  mutations: {
    allItems(state, payload: ICharacter[]) {
      state.allItems = payload;
    },
    resetItems(state) {
      state.allItems = [];
    },
    totalPages(state, payload) {
      state.totalPages = payload;
    },
    currentPage(state, payload) {
      return (state.currentPage = payload);
    },
    pageData(state, payload) {
      return (state.pageData = payload);
    },
    setQuery(state, payload) {
      state.query = payload;
    },
  },
  getters: {
    allItems(state) {
      return state.allItems;
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
    init({ commit }) {
      commit("currentPage", 1);
      commit("totalPages", 0);
      commit("resetItems");
    },

    async getCount({ commit, getters, rootGetters }) {
      const query = getters.query;
      const totalCount = await gqlApi.getSearchCount(query);

      const pagesCount = Math.floor(totalCount / rootGetters["app/perPage"]);

      commit("totalPages", pagesCount);
    },

    async search({ commit, dispatch }, query) {
      await dispatch("init");

      commit("setQuery", query);
      await dispatch("getData");
      dispatch("showHandler");
    },

    async getData({ commit, getters, rootGetters }) {
      const query = getters.query;
      const totalCount = await gqlApi.getSearchCount(query);

      const pagesCount = Math.floor(totalCount / rootGetters["app/perPage"]);
      commit("totalPages", pagesCount);

      const items = await gqlApi.getSearchData(query, totalCount);
      commit("allItems", items);
    },

    getItems({ getters, rootGetters }, page) {
      const items = getItemsInRange(
        {
          page: page,
          limit: rootGetters["app/perPage"],
          items: getters.allItems,
        },
        true
      );

      return items;
    },

    async changePageHandler({ commit, dispatch }, page) {
      commit("currentPage", page);

      dispatch("showHandler");
    },

    async showHandler({ commit, dispatch, getters, rootGetters }) {
      const page = getters.currentPage;
      const items = await dispatch("getItems", page);

      commit("pageData", items);
    },

    async changePage({ commit, dispatch }, page) {
      commit("currentPage", page);

      dispatch("showHandler");
    },
  },
};

export default search;
