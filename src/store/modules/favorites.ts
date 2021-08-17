import { Module } from "vuex";
import { FavoritesStateTypes, IRootState } from "../interfaces";
import { ICharacter } from "@/interfaces";
import lsApi from "@/api/ls";
import {
  setItems,
  setPageData,
  setTotalPages,
  setCurrentPage,
} from "./../helpers/commonMutations";
import {
  items,
  pageData,
  totalPages,
  currentPage,
} from "./../helpers/commonGetters";
import {
  prepareItemsForPage,
  showPageHandler,
  changePageHandler,
} from "../helpers/commonActions";

const favorites: Module<FavoritesStateTypes, IRootState> = {
  namespaced: true,
  state: {
    items: [],
    pageData: [],
    totalPages: 0,
    currentPage: 1,
  },
  mutations: {
    setItems,
    setPageData,
    setTotalPages,
    setCurrentPage,
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
    items,
    pageData,
    totalPages,
    currentPage,
  },
  actions: {
    prepareItemsForPage,
    showPageHandler,
    changePageHandler,
    async init({ dispatch, commit, getters }, page?: number) {
      if (getters.items) {
        commit("setCurrentPage", page);
        await dispatch("getData");
        await dispatch("getCount");
        await dispatch("showPageHandler");
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
      commit("setItems", favorites);
    },

    async removeFromFavorite({ commit, dispatch }, payload) {
      commit("removeFavorite", payload);
      await dispatch("saveData");
      await dispatch("getData");
      await dispatch("getCount");
      await dispatch("showPageHandler");
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
