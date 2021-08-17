import { createStore } from "vuex";
import { IRootState } from "./interfaces";
import characters from "./modules/characters";
import favorites from "./modules/favorites";
import search from "./modules/search";
import app from "./modules/app";

export default createStore<IRootState>({
  modules: { app, characters, favorites, search },
});
