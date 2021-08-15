import { Module } from "vuex";
import { ActionContextType, IRootState, SearchStateTypes } from "../interfaces";
import { ICharacter } from "@/interfaces";

import { getItemsInIDRange } from "@/helpers/functions";
import lsApi from "@/api/ls";

const search: Module<SearchStateTypes, IRootState> = {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {},
};

export default search;
