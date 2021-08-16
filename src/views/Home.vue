<template>
  <section class="home">
    <h1 class="home__title">
      RICK & <br />
      MORTY DB
    </h1>
    <app-themes
      :current="currentTheme"
      :themes="themes"
      @themeChange="themeChangeHandler"
    ></app-themes>
  </section>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AppThemes from "@/components/AppThemes.vue";
import themeImg from "@/assets/images/rick.png";
import { mapGetters } from "vuex";

export default defineComponent({
  components: { AppThemes },
  computed: {
    ...mapGetters({ currentTheme: "app/theme" }),
    themes() {
      const themes = [
        { label: "Dark", img: themeImg, value: "dark" },
        { label: "White", img: themeImg, value: "default" },
      ];

      return themes;
    },
  },
  methods: {
    themeChangeHandler(value: string) {
      this.$store.dispatch("app/changeTheme", value);
    },
  },
});
</script>
