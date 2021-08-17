import { useStore } from "vuex";

const useCharacters = () => {
  const store = useStore();

  const onMounted = async (page: string) => {
    try {
      await store.dispatch("characters/init", page);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { onMounted };
};

export default useCharacters;
