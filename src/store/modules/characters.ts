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
    addToAll(state, payload: ICharacter[]) {
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
    loadedPages(state) {
      return state.loadedPages;
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
      commit("addToAll", characters);
    },

    async currentPage(
      { commit, dispatch, getters }: ActionContextType,
      page = 1
    ) {
      if (page !== getters.currentPage) {
        commit("currentPage", page);
      }
      const current = page === getters.currentPage ? getters.currentPage : page;
      const items = getItemsInIDRange({
        page: current,
        limit: PER_PAGE,
        items: getters.all,
      });

      if (items.length === PER_PAGE) {
        commit("pageData", items);
      } else if (items.length < PER_PAGE) {
        await dispatch("getCharacters", getters.loadedPages + 1);
        dispatch("currentPage", current);
      } else {
        // last page
        console.log("last");
      }

      commit("currentPage", page);
    },
  },
};

export default characters;
