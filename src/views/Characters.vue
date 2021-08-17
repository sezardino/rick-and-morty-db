<template>
  <app-error-boundary :error="error">
    <my-loader v-if="loading"></my-loader>
    <section v-else>
      <h1 class="visually-hidden">All Characters</h1>
      <my-table
        emptyLabel="The are no data to display"
        :data="pageData"
        :favorites="favorites"
        @addFavorite="favoriteHandler"
      ></my-table>
      <my-pagination
        v-if="pageData.length"
        :show="paginationToShow"
        :total="totalPages"
        linkPath="characters"
        :pageChangeHandler="pageChange"
      >
      </my-pagination>
    </section>
  </app-error-boundary>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usePage from "@/use/usePage";
import useFavorite from "@/use/useFavorite";
import useCharacters from "@/use/useCharacters";
import AppErrorBoundary from "@/components/AppErrorBoundary.vue";

export default defineComponent({
  components: { AppErrorBoundary },
  name: "Home",
  setup() {
    const { onMounted } = useCharacters();

    const pageProps = {
      storeName: "characters",
      mountedHandler: onMounted,
    };
    const page = usePage(pageProps);
    const { handler: favoriteHandler } = useFavorite();

    return { ...page, favoriteHandler };
  },
});
</script>
