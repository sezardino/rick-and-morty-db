import { Module } from "vuex";
import { PER_PAGE } from "@/helpers/const";
import {
  ActionContextType,
  FavoritesStateTypes,
  IRootState,
} from "../interfaces";
import { ICharacter } from "@/interfaces";

import { getItemsInIDRange } from "@/helpers/functions";
import lsApi from "@/api/ls";

const favorites: Module<FavoritesStateTypes, IRootState> = {
  namespaced: true,
  state: {
    allItems: [],
    pageData: [],
    totalPages: 0,
    currentPage: 1,
  },
  mutations: {
    allItems(state, payload: any) {
      if (payload.length === 0 || payload.length) {
        state.allItems = [...state.allItems, ...payload];
      } else {
        const needed = payload as never;
        state.allItems.push(needed);
      }
    },
    pageData(state, payload) {
      state.pageData = payload;
    },
    totalPages(state, payload) {
      state.totalPages = payload;
    },
    currentPage(state, payload) {
      state.currentPage = payload;
    },

    addFavorite(state, payload: any) {
      if (payload.length) {
        state.allItems = [...state.allItems, ...payload];
      } else {
        const needed = payload as never;
        state.allItems.push(needed);
      }
    },

    removeFavorite(state, payload) {
      state.allItems = state.allItems.filter((item) => item.id !== payload.id);
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
  },
  actions: {
    async init({ commit, getters, rootGetters }) {
      if (!getters.allItems.length) {
        const favorites = await lsApi.getData();
        const count = favorites.length;
        const pagesCount = Math.floor(count / rootGetters["app/perPage"]);

        commit("totalPages", pagesCount);
        commit("allItems", favorites);
      }
    },

    async currentPageChange({ commit, dispatch }, page) {
      commit("currentPage", page);
      dispatch("currentPageChangeHandler");
    },

    getItems({ getters, rootGetters }, page) {
      const items = getItemsInIDRange({
        page: page,
        limit: rootGetters["app/perPage"],
        items: getters.allItems,
      });

      return items;
    },

    async currentPageChangeHandler({ commit, dispatch, getters }) {
      const page = getters.currentPage;
      const items = await dispatch("getItems", page);

      commit("pageData", items);
    },

    favoriteHandler({ commit, getters }, payload) {
      if (getters.allItems.find((item: ICharacter) => item.id === payload.id)) {
        commit("removeFavorite", payload);
      } else {
        commit("addFavorite", payload);
      }

      lsApi.saveData(getters.allItems);
    },
  },
};

export default favorites;
