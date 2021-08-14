<template>
  <my-loader v-if="loading"></my-loader>
  <section v-else>
    <h1 class="visually-hidden">Favorite characters</h1>
    <my-table
      emptyLabel="The are no favorite characters, add some on all characters page"
      :data="[]"
    ></my-table>
    <!-- <my-pagination
      :current="currentPage"
      :show="7"
      :total="totalPages"
      @pageChange="pageChangeHaldler"
    ></my-pagination> -->
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Favorites",
  data() {
    return { loading: true };
  },

  mounted() {
    this.loading = false;
  },
});
</script>
