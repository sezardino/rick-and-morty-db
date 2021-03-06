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

export interface CharactersStateTypes extends defaultState {}
export interface FavoritesStateTypes extends defaultState {}
export interface SearchStateTypes extends defaultState {
  query: string;
}

export type ActionContextType = {
  dispatch: Dispatch;
  commit: Commit;
  getters: any;
  rootGetters: any;
};
