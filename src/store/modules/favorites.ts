import { Module } from "vuex";
import { FavoritesStateTypes, IRootState } from "../interfaces";
import { ICharacter } from "@/interfaces";

import { getItemsInRange } from "@/helpers/functions";
import lsApi from "@/api/ls";

const favorites: Module<FavoritesStateTypes, IRootState> = {
  namespaced: true,
  state: {
    items: [],
    pageData: [],
    totalPages: 0,
    currentPage: 1,
  },
  mutations: {
    setItems(state, payload: any) {
      if (payload.length === 0 || payload.length) {
        state.items = [...state.items, ...payload];
      } else {
        const needed = payload as never;
        state.items.push(needed);
      }
    },
    setPageData(state, payload) {
      state.pageData = payload;
    },
    setTotalPages(state, payload) {
      state.totalPages = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },

    addFavorite(state, payload: any) {
      if (payload.length) {
        state.items = [...state.items, ...payload];
      } else {
        const needed = payload as never;
        state.items.push(needed);
      }
    },

    removeFavorite(state, payload) {
      state.items = state.items.filter((item) => item.id !== payload.id);
    },
  },
  getters: {
    items(state) {
      return state.items;
    },
    pageData(state) {
      console.log(state.pageData);
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
    async init({ dispatch, getters }) {
      if (!getters.items.length) {
        await dispatch("getCharacters");
      }
    },

    async getCharacters({ commit, rootGetters }) {
      const favorites = await lsApi.getData("favorites");
      const count = favorites.length;
      const pagesCount = Math.ceil(count / rootGetters["app/perPage"]);

      commit("setTotalPages", pagesCount);
      commit("setItems", favorites);
    },

    showPage({ dispatch }, page) {
      dispatch("currentPageChange", page);
    },

    async changePageHandler({ commit, getters, dispatch }, page) {
      if (page > getters.totalPages) {
        return;
      }

      commit("setCurrentPage", page);

      await dispatch("getCharacters", page);

      dispatch("currentPageChangeHandler");
    },

    async currentPageChange({ commit, dispatch }, page) {
      commit("setCurrentPage", page);
      dispatch("currentPageChangeHandler");
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

    async currentPageChangeHandler({ commit, dispatch, getters }) {
      const page = getters.currentPage;
      const items = await dispatch("getItems", page);

      commit("setPageData", items);
    },

    saveData({ getters }) {
      lsApi.saveData(getters.items, "favorites");
    },

    favoriteHandler({ commit, dispatch, getters }, payload) {
      if (getters.items.find((item: ICharacter) => item.id === payload.id)) {
        commit("removeFavorite", payload);
      } else {
        commit("addFavorite", payload);
      }

      dispatch("saveData");
    },
  },
};

export default favorites;
