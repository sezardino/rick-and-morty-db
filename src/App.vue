<template>
  <component :is="layout + '-layout'">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("characters/init");
    } catch (error) {
      console.log(error);
    }
  },
  // setup() {

  // },
});
</script>
