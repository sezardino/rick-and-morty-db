import { Module } from "vuex";
import { CharactersStateTypes, IRootState } from "../interfaces";
import { ICharacter } from "@/interfaces";

import gqlApi from "@/api/gqlApi";
import { getItemsInIDRange } from "@/helpers/functions";

const characters: Module<CharactersStateTypes, IRootState> = {
  namespaced: true,
  state: {
    all: [],
    pageData: [],
    currentPage: 1,
    totalPages: 0,
  },
  mutations: {
    addToAll(state, payload: ICharacter[]) {
      const filtered = payload.filter((payloadItem) => {
        if (!state.all.find((item) => item.id === payloadItem.id)) {
          return payloadItem;
        }
      });
      state.all = [...state.all, ...filtered];
    },
    totalPages(state, payload: number) {
      state.totalPages = payload;
    },
    pageData(state, payload) {
      state.pageData = payload;
    },
    currentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  getters: {
    all(state) {
      return state.all;
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
      commit("totalPages", pagesCount);
      dispatch("currentPageChange", page);
    },

    async getCharacters({ commit, rootGetters }, page: number) {
      const neededPage = Math.ceil((page * rootGetters["app/perPage"]) / 20);
      const characters = await gqlApi.getCharacters(neededPage);

      commit("addToAll", characters);
    },

    async currentPageChange({ commit, dispatch }, page) {
      commit("currentPage", page);

      await dispatch("getCharacters", page);

      dispatch("currentPageChangeHandler");
    },

    getItems({ getters, rootGetters }, page) {
      const items = getItemsInIDRange({
        page: page,
        limit: rootGetters["app/perPage"],
        items: getters.all,
      });

      return items;
    },

    async currentPageChangeHandler({ commit, dispatch, getters, rootGetters }) {
      const perPage = rootGetters["app/perPage"];
      const page = getters.currentPage;
      const items = await dispatch("getItems", page);

      if (items.length === perPage) {
        commit("pageData", items);
      } else if (items.length < perPage) {
        if (getters.totalPages == page) {
          commit("pageData", items);
        }
        const neededPage = Math.ceil((page * perPage) / 20);
        await dispatch("getCharacters", neededPage);
      }
    },
  },
};

export default characters;
