<template>
  <my-loader v-if="loading"></my-loader>
  <section v-else>
    <h1 class="visually-hidden">All Characters</h1>
    <my-table :data="pageData"></my-table>
    <my-pagination
      :current="currentPage"
      :show="6"
      :total="totalPages"
    ></my-pagination>
  </section>
</template>

<script lang="ts">
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
    }),
  },
  async mounted() {
    try {
      await this.$store.dispatch("characters/init");
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },
  watch: {},
});
</script>
