import { Module } from "vuex";
import { PER_PAGE, PAGINATION_TO_SHOW, THEMES } from "@/helpers/const";
import { ActionContextType, IRootState, AppStateTypes } from "../interfaces";
import lsApi from "@/api/ls";

const app: Module<AppStateTypes, IRootState> = {
  namespaced: true,
  state: {
    perPage: PER_PAGE,
    paginationToShow: PAGINATION_TO_SHOW,
    theme: THEMES.DEFAULT,
  },
  getters: {
    perPage(state) {
      return state.perPage;
    },
    paginationToShow(state) {
      return state.paginationToShow;
    },
    theme(state) {
      return state.theme;
    },
  },
  mutations: {
    theme(state, payload) {
      if (payload) {
        state.theme = payload;
      }
    },
  },
  actions: {
    getTheme({ commit }) {
      const theme = lsApi.getData("theme");
      commit("theme", theme);
    },

    saveTheme({ getters }) {
      lsApi.saveData(getters.theme, "theme");
    },

    changeTheme({ commit, dispatch }, value) {
      commit("theme", value);
      dispatch("saveTheme");
    },
  },
};

export default app;
