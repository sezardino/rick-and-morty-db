import { ICharacter } from "@/interfaces";
import { Commit, Dispatch, Getter } from "vuex";

export interface IRootState {
  characters: CharactersStateTypes;
}

export interface CharactersStateTypes {
  all: ICharacter[] | [];
  pageData: ICharacter[] | [];
  currentPage: number;
  totalPages: number;
  loadedPages: number;
}

export type ActionContextType = {
  dispatch: Dispatch;
  commit: Commit;
  getters: any;
};
