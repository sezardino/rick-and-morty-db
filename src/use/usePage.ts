import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const usePage = () => {
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

  const pageChange = (page: number) => {
    store.dispatch("favorites/currentPageChange", page);
  };
};

export default usePage;
