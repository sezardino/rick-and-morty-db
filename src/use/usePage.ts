import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

type UsePageTypes = {
  storeName: string;
  queryChangeHandler?: (query: string) => void;
  mountedHandler: (data: string) => void;
};

const usePage = (props: UsePageTypes) => {
  const { storeName, queryChangeHandler, mountedHandler } = props;
  const loading = ref(true);
  const error = ref(false);
  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  const searchParam = computed(() => route.query.s);

  const page = computed(() => route.params.page);
  const pageData = computed(() => store.getters[storeName + "/pageData"]);
  const currentPage = computed(() => store.getters[storeName + "/currentPage"]);
  const totalPages = computed(() => store.getters[storeName + "/totalPages"]);
  const favorites = computed(() => store.getters["favorites/items"]);
  const paginationToShow = computed(
    () => store.getters["app/paginationToShow"]
  );

  const pageChange = async (page: number) => {
    loading.value = true;
    try {
      await store.dispatch(storeName + "/changePageHandler", page);
    } catch (e) {
      error.value = true;
    }
    loading.value = false;
  };

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

  watch(searchParam, (newValue) => {
    loading.value = true;
    try {
      queryChangeHandler!(newValue as string);
    } catch (e) {
      error.value = true;
    }
    loading.value = false;
  });

  onMounted(async () => {
    try {
      // if (storeName === "favorites") {
      //   await store.dispatch("favorites/showPage", page);
      //   pageCheck(page);
      //   return;
      // } else if (storeName === "search") {
      //   await store.dispatch("search/init", searchParam);
      // } else {
      //   await store.dispatch(storeName + "/init", page);
      // }
      const param = storeName === "search" ? searchParam : page;
      mountedHandler(param.value as string);
      // pageCheck(page.value as string);
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

  return {
    loading,
    error,
    pageData,
    currentPage,
    totalPages,
    favorites,
    paginationToShow,
    pageChange,
  };
};

export default usePage;
