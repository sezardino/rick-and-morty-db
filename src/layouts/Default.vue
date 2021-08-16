<template>
  <app-header>
    <template v-slot:header-search>
      <app-search-form></app-search-form>
    </template>
    <template v-slot:header-themes>
      <app-themes
        :themes="themes"
        :current="currentTheme"
        @themeChange="themeHandler"
      ></app-themes>
    </template>
    <template v-slot:header-nav>
      <app-nav></app-nav>
    </template>
  </app-header>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useThemes from "@/use/useTheme";

import AppHeader from "@/components/AppHeader.vue";
import AppSearchForm from "@/components/AppSearchForm.vue";
import AppNav from "@/components/AppNav.vue";
import AppThemes from "@/components/AppThemes.vue";

export default defineComponent({
  name: "default-layout",
  components: { AppHeader, AppSearchForm, AppNav, AppThemes },
  setup() {
    const { handler, themes, theme: currentTheme } = useThemes();

    return {
      themeHandler: handler,
      themes,
      currentTheme,
    };
  },
});
</script>
