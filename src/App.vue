<template>
  <app-error-boundary :error="error">
    <component :is="layout + '-layout'">
      <router-view />
    </component>
  </app-error-boundary>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppErrorBoundary from "@/components/AppErrorBoundary.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  components: { AppErrorBoundary },
  data() {
    return { error: false };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
    ...mapGetters({ theme: "app/theme" }),
  },

  methods: {
    changeCssProperties(theme: string) {
      const root = document.querySelector(":root") as HTMLElement;

      const properties = [
        "bg",
        "first-color",
        "second-color",
        "third-color",
        "hover-color",
        "font-color",
        "border-color",
      ];

      properties.forEach((property) => {
        root.style.setProperty(
          `--theme-${property}`,
          `var(--theme-${theme}-${property})`
        );
      });
    },
  },

  watch: {
    theme(newValue) {
      this.changeCssProperties(newValue);
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("favorites/init");
      await this.$store.dispatch("app/getTheme");
    } catch (error) {
      this.error = true;
    }
  },
});
</script>
