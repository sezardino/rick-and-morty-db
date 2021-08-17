import {
  items,
  currentPage,
  pageData,
  totalPages,
} from "./../helpers/commonGetters";
import {
  setTotalPages,
  setPageData,
  setCurrentPage,
} from "./../helpers/commonMutations";
import { prepareItemsForPage } from "../helpers/commonActions";
import { Module } from "vuex";
import { CharactersStateTypes, IRootState } from "../interfaces";
import { ICharacter } from "@/interfaces";

import gqlApi from "@/api/gqlApi";

const characters: Module<CharactersStateTypes, IRootState> = {
  namespaced: true,
  state: {
    items: [],
    pageData: [],
    currentPage: 1,
    totalPages: 0,
  },
  mutations: {
    setTotalPages,
    setPageData,
    setCurrentPage,
    addItems(state, payload: ICharacter[]) {
      const filtered = payload.filter((payloadItem) => {
        if (!state.items.find((item) => item.id === payloadItem.id)) {
          return payloadItem;
        }
      });
      state.items = [...state.items, ...filtered];
    },
  },
  getters: {
    items,
    currentPage,
    pageData,
    totalPages,
  },
  actions: {
    prepareItemsForPage,
    async init({ commit, rootGetters, dispatch }, page) {
      const count = await gqlApi.getCount();
      const pagesCount = Math.floor(count / rootGetters["app/perPage"]);
      commit("setTotalPages", pagesCount);
      dispatch("changePageHandler", page);
      commit("setCurrentPage", page);
    },

    async getData({ commit, rootGetters }, page: number) {
      const neededPage = Math.ceil((page * rootGetters["app/perPage"]) / 20);
      const characters = await gqlApi.getCharacters(neededPage);

      commit("addItems", characters);
    },

    async changePageHandler({ commit, getters, dispatch }, page) {
      if (page > getters.totalPages) {
        return;
      }

      commit("setCurrentPage", page);
      await dispatch("getData", page);
      dispatch("showPageHandler");
    },

    async showPageHandler({ commit, dispatch, getters, rootGetters }) {
      const perPage = rootGetters["app/perPage"];
      const page = getters.currentPage;
      const items = await dispatch("prepareItemsForPage", {
        page,
        indexSearch: false,
      });

      if (items.length === perPage) {
        commit("setPageData", items);
      } else if (items.length < perPage) {
        if (getters.totalPages == page) {
          commit("setPageData", items);
        }
        const neededPage = Math.ceil((page * perPage) / 20);
        await dispatch("getData", neededPage);
        await dispatch("showPageHandler");
      }
    },
  },
};

export default characters;
