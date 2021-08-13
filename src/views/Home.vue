<template>
  <section>
    <h1 class="visually-hidden">All Characters</h1>
    <my-table :data="all"></my-table>
    <my-pagination></my-pagination>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "Home",
  components: {},
  computed: {
    ...mapGetters({ all: "characters/all" }),
  },
  async mounted() {
    try {
      await this.$store.dispatch("characters/getAllCharacters");
    } catch (error) {
      console.log(error);
    }
  },
});
</script>
