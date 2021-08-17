import { ICharacter } from "@/interfaces";
import { useStore } from "vuex";

const useFavorite = () => {
  const store = useStore();

  const handler = async (item: ICharacter) => {
    await store.dispatch("favorites/favoriteHandler", item);
  };

  const onMounted = async (page: string) => {
    try {
      await store.dispatch("favorites/showPage", page);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    handler,
    onMounted,
  };
};

export default useFavorite;
