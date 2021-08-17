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
        :show="paginationToShow"
        :total="totalPages"
        linkPath="characters"
        :pageChangeHandler="pageChangeHandler"
      >
      </my-pagination>
    </section>
  </app-error-boundary>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCharacters from "@/use/useCharacters";
import useFavorite from "@/use/useFavorite";
import AppErrorBoundary from "@/components/AppErrorBoundary.vue";

export default defineComponent({
  components: { AppErrorBoundary },
  name: "Home",
  setup() {
    const characters = useCharacters();
    const { favoriteHandler } = useFavorite();

    return { ...characters, favoriteHandler };
  },
});
</script>
