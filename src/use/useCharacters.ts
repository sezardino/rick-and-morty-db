import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const useCharacters = () => {
  const loading = ref(true);
  const error = ref(false);

  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const pageData = computed(() => store.getters["characters/pageData"]);
  const currentPage = computed(() => store.getters["characters/currentPage"]);
  const totalPages = computed(() => store.getters["characters/totalPages"]);
  const favorites = computed(() => store.getters["favorites/items"]);
  const paginationToShow = computed(
    () => store.getters["app/paginationToShow"]
  );

  const pageCheck = (page: string) => {
    const pageNum = +page;
    if (!pageNum || pageNum <= 0 || pageNum >= totalPages.value) {
      router.push("/404");
      loading.value = false;
      return false;
    } else {
      return true;
    }
  };

  const pageChangeHandler = (page: number) => {
    store.dispatch("characters/currentPageChange", page);
  };

  onMounted(async () => {
    const page = route.params.page as string;
    try {
      await store.dispatch("characters/init", page);
      pageCheck(page);
    } catch (e) {
      error.value = true;
    }
  });

  watch(pageData, (newValue) => {
    if (newValue) {
      loading.value = false;
    }
  });
  watch(currentPage, () => {
    loading.value = true;
  });

  console.log(pageData);

  return {
    loading,
    error,
    pageData,
    currentPage,
    totalPages,
    favorites,
    paginationToShow,
    pageCheck,
    pageChangeHandler,
  };
};

export default useCharacters;
