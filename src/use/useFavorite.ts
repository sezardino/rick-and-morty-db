import { computed, onMounted, ref, watch } from "vue";
import { ICharacter } from "@/interfaces";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const useFavorite = () => {
  const loading = ref(true);
  const error = ref(false);

  const store = useStore();
  const route = useRoute();

  const favorites = computed(() => store.getters["favorites/allItems"]);
  const pageData = computed(() => store.getters["favorites/pageData"]);
  const currentPage = computed(() => store.getters["favorites/currentPage"]);
  const totalPages = computed(() => store.getters["favorites/totalPages"]);
  const paginationToShow = computed(
    () => store.getters["app/paginationToShow"]
  );
  const favoriteHandler = async (item: ICharacter) => {
    await store.dispatch("favorites/favoriteHandler", item);
  };

  const pageChange = (page: number) => {
    store.dispatch("favorites/currentPageChange", page);
  };

  watch(pageData, (newValue) => {
    if (newValue) {
      loading.value = false;
    }
  });

  onMounted(async () => {
    const page = route.params.page;
    try {
      await store.dispatch("favorites/currentPageChange", page);
    } catch (e) {
      error.value = true;
    }
  });

  return {
    favorites,
    loading,
    error,
    favoriteHandler,
    pageChange,
    pageData,
    currentPage,
    totalPages,
    paginationToShow,
  };
};

export default useFavorite;
