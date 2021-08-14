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
}

export type ActionContextType = {
  dispatch: Dispatch;
  commit: Commit;
  getters: any;
};

export type PaginationType = {
  id: string;
  value: number | null;
  label: string;
  disabled: boolean;
};
