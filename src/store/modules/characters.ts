import { Module } from "vuex";
import { PER_PAGE } from "@/helpers/const";
import {
  ActionContextType,
  CharactersStateTypes,
  IRootState,
} from "../interfaces";
import { ICharacter } from "@/interfaces";

import gqlApi from "@/api/gqlApi";
import { getItemsInIDRange } from "@/helpers/functions";

const characters: Module<CharactersStateTypes, IRootState> = {
  namespaced: true,
  state: {
    all: [],
    pageData: [],
    currentPage: 1,
    loadedPages: 0,
    totalPages: 0,
  },
  mutations: {
    all(state, payload: ICharacter[]) {
      state.all = [...state.all, ...payload];
    },
    loadedPages(state, payload: number) {
      state.loadedPages = payload;
    },
    totalPages(state, payload: number) {
      state.totalPages = payload;
    },
    pageData(state, payload) {
      state.pageData = payload;
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
    async init({ commit, dispatch }: ActionContextType) {
      const count = await gqlApi.getCount();
      commit("totalPages", count);
      await dispatch("getCharacters");
      dispatch("currentPage");
    },

    async getCharacters({ commit }: ActionContextType, page?: number) {
      const { characters, page: loadedPage } = await gqlApi.getCharacters(page);

      commit("loadedPages", loadedPage);
      commit("all", characters);
    },

    async currentPage({ commit, getters }: ActionContextType) {
      const items = getItemsInIDRange({
        page: getters.currentPage,
        limit: PER_PAGE,
        items: getters.all,
      });

      if (items.length === PER_PAGE) {
        commit("pageData", items);
        return;
      } else if (items.length < PER_PAGE) {
        // await
      } else {
        // last page
        console.log("last");
      }
    },
  },
};

export default characters;
