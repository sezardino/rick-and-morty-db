import { ICharacter } from "@/interfaces";
import { Commit, Dispatch } from "vuex";

export interface IRootState {
  characters: CharactersStateTypes;
}

export interface CharactersStateTypes {
  all: ICharacter[] | [];
  favorites: ICharacter[] | [];
}

export type ActionContextType = {
  dispatch: Dispatch;
  commit: Commit;
};
