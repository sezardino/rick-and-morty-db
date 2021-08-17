import { ICharacter } from "./../../interfaces/index";
import { defaultState } from "../interfaces";

export const setItems = (state: defaultState, payload: ICharacter[]) => {
  state.items = payload;
};
export const setTotalPages = (state: defaultState, payload: number) => {
  state.totalPages = payload;
};
export const setCurrentPage = (state: defaultState, payload: number) => {
  return (state.currentPage = payload);
};
export const setPageData = (state: defaultState, payload: ICharacter[]) => {
  return (state.pageData = payload);
};
