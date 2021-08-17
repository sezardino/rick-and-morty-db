<template>
  <app-error-boundary :error="error">
    <component :is="layout + '-layout'">
      <router-view />
    </component>
  </app-error-boundary>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useThemes from "@/use/useTheme";

import AppErrorBoundary from "@/components/AppErrorBoundary.vue";

export default defineComponent({
  components: { AppErrorBoundary },
  data() {
    return { error: false };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("favorites/init");
      await this.$store.dispatch("app/getTheme");
    } catch (error) {
      console.log(error);
      this.error = true;
    }
  },
});
</script>
