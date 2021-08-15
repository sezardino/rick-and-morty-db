<template>
  <app-error-boundary :error="error">
    <my-loader v-if="loading"></my-loader>
    <section v-else>
      <h1 class="visually-hidden">Favorite characters</h1>
      <my-table
        emptyLabel="The are no favorite characters, add some on all characters page"
        :data="pageData"
        :favorites="pageData"
        @addFavorite="favoriteHandler"
      ></my-table>
      <my-pagination
        :show="paginationToShow"
        :total="totalPages"
        linkPath="favorites"
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
  name: "Favorites",
  components: { AppErrorBoundary },
  data() {
    return { loading: true, error: false };
  },

  computed: {
    ...mapGetters({
      pageData: "favorites/pageData",
      currentPage: "favorites/currentPage",
      totalPages: "favorites/totalPages",
      paginationToShow: "app/paginationToShow",
    }),
  },

  methods: {
    pageChangeHaldler(page: number) {
      this.$store.dispatch("favorites/currentPageChange", page);
    },
    favoriteHandler(item: ICharacter) {
      this.$store.dispatch("favorites/favoriteHandler", item);
    },
  },
  watch: {
    pageData(newValue) {
      if (newValue) {
        this.loading = false;
      }
    },
  },
  async mounted() {
    const page = this.$route.params.page;
    try {
      await this.$store.dispatch("favorites/currentPageChange", page);
    } catch (error) {
      this.error = true;
    }
  },
});
</script>
