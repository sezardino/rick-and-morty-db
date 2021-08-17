import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const useSearch = () => {
  const loading = ref(true);
  const error = ref(false);
  const store = useStore();
  const route = useRoute();

  const pageData = computed(() => store.getters["search/pageData"]);
  const currentPage = computed(() => store.getters["search/currentPage"]);
  const totalPages = computed(() => store.getters["search/totalPages"]);
  const favorites = computed(() => store.getters["favorites/items"]);
  const paginationToShow = computed(
    () => store.getters["app/paginationToShow"]
  );
  const searchParam = computed(() => route.query.s);

  const fetchData = async () => {
    loading.value = true;
    try {
      await store.dispatch("search/search", searchParam);
      loading.value = false;
    } catch (e) {
      error.value = true;
    }
  };

  const pageChange = async (page: number) => {
    loading.value = true;
    try {
      await store.dispatch("search/changePageHandler", page);
    } catch (e) {
      error.value = true;
    }
    loading.value = false;
  };

  watch(searchParam, () => {
    fetchData();
  });

  onMounted(() => {
    fetchData();
  });

  return {
    error,
    loading,
    pageData,
    currentPage,
    totalPages,
    favorites,
    paginationToShow,
    searchParam,
    pageChange,
  };
};

export default useSearch;
