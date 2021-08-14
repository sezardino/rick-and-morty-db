<template>
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
      :current="currentPage"
      :show="7"
      :total="totalPages"
      @pageChange="pageChangeHaldler"
    ></my-pagination>
  </section>
</template>

<script lang="ts">
import { ICharacter } from "@/interfaces";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "Home",
  data() {
    return { loading: true };
  },
  computed: {
    ...mapGetters({
      pageData: "characters/pageData",
      currentPage: "characters/currentPage",
      totalPages: "characters/totalPages",
      favorites: "characters/favorites",
    }),
  },
  methods: {
    pageChangeHaldler(page: number) {
      this.$store.dispatch("characters/currentPage", page);
    },
    favoriteHandler(item: ICharacter) {
      this.$store.dispatch("characters/favoriteHandler", item);
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
  mounted() {
    if (this.pageData.length) {
      this.loading = false;
    }
  },
});
</script>
