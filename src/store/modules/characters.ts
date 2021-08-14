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
import lsApi from "@/api/ls";

const characters: Module<CharactersStateTypes, IRootState> = {
  namespaced: true,
  state: {
    all: [],
    favorites: [],
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
    addFavorite(state, payload: any) {
      if (payload.length) {
        state.favorites = [...state.favorites, ...payload];
      } else {
        const needed = payload as never;
        state.favorites.push(needed);
      }
    },
    removeFavorite(state, payload) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== payload.id
      );
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
    favorites(state) {
      return state.favorites;
    },
  },
  actions: {
    async init({ commit, dispatch }: ActionContextType) {
      const count = await gqlApi.getCount();
      const favorites = await lsApi.getData();
      const pagesCount = Math.floor(count / PER_PAGE);
      await dispatch("getCharacters");
      dispatch("currentPage");
      commit("totalPages", pagesCount);
      commit("addFavorite", favorites);
    },

    async getCharacters({ commit }: ActionContextType, page?: number) {
      const characters = await gqlApi.getCharacters(page);

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

      if (
        items.length === PER_PAGE ||
        (getters.totalPages === current && items.length)
      ) {
        commit("pageData", items);
      } else if (items.length < PER_PAGE) {
        const neededPage = Math.ceil((current * PER_PAGE) / 20);
        await dispatch("getCharacters", neededPage);
        dispatch("currentPage", current);
      }

      commit("currentPage", page);
    },

    favoriteHandler({ commit, getters }: ActionContextType, payload) {
      if (
        getters.favorites.find((item: ICharacter) => item.id === payload.id)
      ) {
        commit("removeFavorite", payload);
      } else {
        commit("addFavorite", payload);
      }

      lsApi.saveData(getters.favorites);
    },
  },
};

export default characters;
