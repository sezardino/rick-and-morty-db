<template>
  <app-error-boundary :error="error">
    <my-loader v-if="loading"></my-loader>
    <section v-else>
      <h1 class="visually-hidden">Favorite characters</h1>
      <my-table
        emptyLabel="The are no favorite characters, add some on all characters page"
        :data="pageData"
        :favorites="favorites"
        @addFavorite="favoriteHandler"
      ></my-table>
      <my-pagination
        :show="paginationToShow"
        :total="totalPages"
        linkPath="favorites"
        :current="currentPage"
        :pageChangeHandler="pageChangeHaldler"
      >
      </my-pagination>
    </section>
  </app-error-boundary>
</template>

<script lang="ts">
import AppErrorBoundary from "@/components/AppErrorBoundary.vue";
import useFavorite from "@/use/useFavorite";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Favorites",
  components: { AppErrorBoundary },
  setup() {
    const { pageChange: pageChangeHaldler, ...favorites } = useFavorite();

    return { ...favorites, pageChangeHaldler };
  },
});
</script>
