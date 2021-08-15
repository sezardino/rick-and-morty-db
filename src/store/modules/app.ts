import { Module } from "vuex";
import { PER_PAGE, PAGINATION_TO_SHOW } from "@/helpers/const";
import { ActionContextType, IRootState, AppStateTypes } from "../interfaces";

const app: Module<AppStateTypes, IRootState> = {
  namespaced: true,
  state: {
    perPage: PER_PAGE,
    paginationToShow: PAGINATION_TO_SHOW,
  },
  getters: {
    perPage(state) {
      return state.perPage;
    },
    paginationToShow(state) {
      return state.paginationToShow;
    },
  },
};

export default app;
