<template>
  <app-error-boundary :error="error">
    <my-loader v-if="loading"></my-loader>
    <section v-else>
      <h1 class="visually-hidden">Search</h1>
      <my-table
        emptyLabel="no data satisfying your request"
        :data="pageData"
        :favorites="favorites"
        @addFavorite="favoriteHandler"
      ></my-table>
      <my-pagination
        type="programmatic"
        :show="paginationToShow"
        :total="totalPages"
        :currentPage="currentPage"
        :pageChangeHandler="pageChange"
      >
      </my-pagination>
    </section>
  </app-error-boundary>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSearch from "@/use/useSearch";
import useFavorite from "@/use/useFavorite";
import AppErrorBoundary from "@/components/AppErrorBoundary.vue";
import usePage from "@/use/usePage";

export default defineComponent({
  components: { AppErrorBoundary },
  setup() {
    const { handler } = useSearch();
    const pageProps = {
      storeName: "search",
      mountedHandler: handler,
      queryChangeHandler: handler,
    };

    const page = usePage(pageProps);
    const { handler: favoriteHandler } = useFavorite();

    return { ...page, favoriteHandler };
  },
});
</script>
