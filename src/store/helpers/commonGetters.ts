import { defaultState } from "../interfaces";

export const items = (state: defaultState) => {
  return state.items;
};
export const pageData = (state: defaultState) => {
  return state.pageData;
};
export const totalPages = (state: defaultState) => {
  return state.totalPages;
};
export const currentPage = (state: defaultState) => {
  return state.currentPage;
};
