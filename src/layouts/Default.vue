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
import AppHeader from "@/components/AppHeader.vue";
import { mapGetters } from "vuex";
import AppSearchForm from "@/components/AppSearchForm.vue";
import AppNav from "@/components/AppNav.vue";
import AppThemes from "@/components/AppThemes.vue";

export default defineComponent({
  name: "default-layout",
  components: { AppHeader, AppSearchForm, AppNav, AppThemes },
  computed: {
    ...mapGetters({ currentTheme: "app/theme" }),
    themes() {
      const themes = [
        { label: "White", value: "default" },
        { label: "Dark", value: "dark" },
      ];

      return themes;
    },
  },
  methods: {
    themeHandler(value: string) {
      console.log(1);
      this.$store.dispatch("app/changeTheme", value);
    },
  },
});
</script>
