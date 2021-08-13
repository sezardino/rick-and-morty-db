import { createStore } from "vuex";
import { IRootState } from "./interfaces";
import characters from "./modules/characters";

export default createStore<IRootState>({
  modules: { characters },
});
