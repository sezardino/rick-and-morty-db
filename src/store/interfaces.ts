import { ICharacter } from "@/interfaces";
import { Commit, Dispatch } from "vuex";

export interface IRootState {
  app: AppStateTypes;
  characters: CharactersStateTypes;
  favorites: FavoritesStateTypes;
  search: SearchStateTypes;
}

export interface defaultState {
  items: ICharacter[] | [];
  pageData: ICharacter[] | [];
  currentPage: number;
  totalPages: number;
}

export interface AppStateTypes {
  perPage: number;
  paginationToShow: number;
  theme: string;
}

export type CharactersStateTypes = defaultState;
export type FavoritesStateTypes = defaultState;
export interface SearchStateTypes extends defaultState {
  query: string;
}

export type ActionContextType = {
  dispatch: Dispatch;
  commit: Commit;
  getters: any;
  rootGetters: any;
};
