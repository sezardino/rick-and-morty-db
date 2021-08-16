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
import AppErrorBoundary from "@/components/AppErrorBoundary.vue";
import { ICharacter } from "@/interfaces";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  components: { AppErrorBoundary },
  data() {
    return { loading: true, error: false };
  },
  computed: {
    ...mapGetters({
      pageData: "search/pageData",
      currentPage: "search/currentPage",
      totalPages: "search/totalPages",
      favorites: "favorites/allItems",
      paginationToShow: "app/paginationToShow",
    }),
    searchParam() {
      return this.$route.query.s;
    },
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        await this.$store.dispatch("search/search", this.searchParam);
        this.loading = false;
      } catch (error) {
        this.error = true;
      }
    },
    async pageChangeHaldler(page: number) {
      this.loading = true;
      await this.$store.dispatch("search/changePageHandler", page);
      this.loading = false;
    },
    favoriteHandler(item: ICharacter) {
      this.$store.dispatch("favorites/favoriteHandler", item);
    },
  },

  watch: {
    searchParam() {
      this.fetchData();
    },
  },

  mounted() {
    this.fetchData();
  },
});
</script>
