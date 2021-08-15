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
  name: "Home",
  data() {
    return { loading: true, error: false };
  },
  computed: {
    ...mapGetters({
      pageData: "characters/pageData",
      currentPage: "characters/currentPage",
      totalPages: "characters/totalPages",
      favorites: "favorites/allItems",
      paginationToShow: "app/paginationToShow",
    }),
  },
  methods: {
    pageCheck(page: string) {
      const pageNum = +page;
      if (!pageNum || pageNum <= 0 || pageNum >= this.totalPages) {
        this.$router.push("/404");
        this.loading = false;
        return false;
      } else {
        return true;
      }
    },
    pageChangeHaldler(page: number) {
      this.$store.dispatch("characters/currentPageChange", page);
    },
    favoriteHandler(item: ICharacter) {
      this.$store.dispatch("favorites/favoriteHandler", item);
    },
  },
  watch: {
    pageData() {
      this.loading = false;
    },
    currentPage() {
      this.loading = true;
    },
  },
  async mounted() {
    const page = this.$route.params.page as string;
    try {
      await this.$store.dispatch("characters/init", page);
      this.pageCheck(page);
      this.loading = false;
    } catch (error) {
      this.error = true;
    }
  },
});
</script>
