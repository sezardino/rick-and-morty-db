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
        :linkPath="`search?s=${searchParam}`"
        :currentPage="currentPage"
        :pageChangeHandler="pageChangeHaldler"
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

export default defineComponent({
  components: { AppErrorBoundary },
  setup() {
    const search = useSearch();
    const { favoriteHandler } = useFavorite();

    return { ...search, favoriteHandler, pageChangeHaldler: search.pageChange };
  },
});
</script>
