import { useStore } from "vuex";

const useSearch = () => {
  const store = useStore();

  const handler = async (query: string) => {
    if (!query) {
      return;
    }
    try {
      await store.dispatch("search/init", query);
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    handler,
  };
};

export default useSearch;
