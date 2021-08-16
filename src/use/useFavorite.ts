import { computed } from "vue";
import { ICharacter } from "@/interfaces";
import { useStore } from "vuex";
const useFavorite = () => {
  const store = useStore();

  const pageData = computed(() => store.getters["favorites/pageData"]);
  const currentPage = computed(() => store.getters["favorites/currentPage"]);
  const totalPages = computed(() => store.getters["favorites/totalPages"]);
  const paginationToShow = computed(
    () => store.getters["app/paginationToShow"]
  );
  const favoriteHandler = (item: ICharacter) => {
    console.log(item);
    store.dispatch("favorites/favoriteHandler", item);
  };

  const pageChange = (page: number) => {
    store.dispatch("favorites/currentPageChange", page);
  };

  return {
    favoriteHandler,
    pageChange,
    pageData,
    currentPage,
    totalPages,
    paginationToShow,
  };
};

export default useFavorite;
