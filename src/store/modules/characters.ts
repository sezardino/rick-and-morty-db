import { Module } from "vuex";
import { mockData } from "@/helpers/const";
import {
  ActionContextType,
  CharactersStateTypes,
  IRootState,
} from "../interfaces";
import { ICharacter } from "@/interfaces";

const characters: Module<CharactersStateTypes, IRootState> = {
  namespaced: true,
  state: {
    all: [],
    favorites: [],
  },
  mutations: {
    all(state, payload: ICharacter[]) {
      state.all = payload;
    },
  },
  getters: {
    all(state) {
      return state.all;
    },
    favorites(state) {
      return state.favorites;
    },
  },
  actions: {
    getAllCharacters({ commit }: ActionContextType) {
      commit("all", mockData);
      return mockData;
    },
  },
};

export default characters;
