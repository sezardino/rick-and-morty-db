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
      state.items = payload;
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
    async init({ dispatch, commit, getters }, page?: number) {
      if (getters.items) {
        commit("setCurrentPage", page);
        await dispatch("getData");
        await dispatch("getCount");
        await dispatch("showHandler");
      } else {
        await dispatch("getData");
      }
    },

    getCount({ getters, commit, rootGetters }) {
      const count = getters.items.length;
      const pagesCount = Math.ceil(count / rootGetters["app/perPage"]);
      commit("setTotalPages", pagesCount);
    },

    async getData({ commit }) {
      const favorites = await lsApi.getData("favorites");
      console.log(favorites);
      commit("setItems", favorites);
    },

    async changePageHandler({ commit, getters, dispatch }, page) {
      if (page > getters.totalPages) {
        return;
      }
      commit("setCurrentPage", page);
      await dispatch("showHandler");
    },

    prepareItemsForPage({ getters, rootGetters }, page) {
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
      const items = await dispatch("prepareItemsForPage", page);

      commit("setPageData", items);
    },

    async removeFromFavorite({ commit, dispatch }, payload) {
      commit("removeFavorite", payload);
      await dispatch("saveData");
      await dispatch("getData");
      await dispatch("showHandler");
    },

    async favoriteHandler({ commit, dispatch, getters }, payload) {
      if (getters.items.find((item: ICharacter) => item.id === payload.id)) {
        await dispatch("removeFromFavorite", payload);
      } else {
        commit("addFavorite", payload);
        await dispatch("saveData");
      }
    },

    saveData({ getters }) {
      lsApi.saveData(getters.items, "favorites");
    },
  },
};

export default favorites;
