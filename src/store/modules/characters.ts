import { Module } from "vuex";
import { CharactersStateTypes, IRootState } from "../interfaces";
import { ICharacter } from "@/interfaces";

import gqlApi from "@/api/gqlApi";
import { getItemsInRange } from "@/helpers/functions";

const characters: Module<CharactersStateTypes, IRootState> = {
  namespaced: true,
  state: {
    items: [],
    pageData: [],
    currentPage: 1,
    totalPages: 0,
  },
  mutations: {
    addItems(state, payload: ICharacter[]) {
      const filtered = payload.filter((payloadItem) => {
        if (!state.items.find((item) => item.id === payloadItem.id)) {
          return payloadItem;
        }
      });
      state.items = [...state.items, ...filtered];
    },
    setTotalPages(state, payload: number) {
      state.totalPages = payload;
    },
    setPageData(state, payload) {
      state.pageData = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  getters: {
    items(state) {
      return state.items;
    },
    currentPage(state) {
      return state.currentPage;
    },
    pageData(state) {
      return state.pageData;
    },
    totalPages(state) {
      return state.totalPages;
    },
  },
  actions: {
    async init({ commit, rootGetters, dispatch }, page) {
      const count = await gqlApi.getCount();
      const pagesCount = Math.floor(count / rootGetters["app/perPage"]);
      commit("setTotalPages", pagesCount);
      dispatch("changePageHandler", page);
    },

    async getCharacters({ commit, rootGetters }, page: number) {
      const neededPage = Math.ceil((page * rootGetters["app/perPage"]) / 20);
      const characters = await gqlApi.getCharacters(neededPage);

      commit("addItems", characters);
    },

    async changePageHandler({ commit, getters, dispatch }, page) {
      if (page > getters.totalPages) {
        return;
      }

      commit("setCurrentPage", page);

      await dispatch("getCharacters", page);

      dispatch("currentPageChangeHandler");
    },

    getItems({ getters, rootGetters }, page) {
      const items = getItemsInRange({
        page: page,
        limit: rootGetters["app/perPage"],
        items: getters.items,
      });

      return items;
    },

    async currentPageChangeHandler({ commit, dispatch, getters, rootGetters }) {
      const perPage = rootGetters["app/perPage"];
      const page = getters.currentPage;
      const items = await dispatch("getItems", page);

      if (items.length === perPage) {
        commit("setPageData", items);
      } else if (items.length < perPage) {
        if (getters.totalPages == page) {
          commit("setPageData", items);
        }
        const neededPage = Math.ceil((page * perPage) / 20);
        await dispatch("getCharacters", neededPage);
        await dispatch("currentPageChangeHandler");
      }
    },
  },
};

export default characters;
