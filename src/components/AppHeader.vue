<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link to="/">
        <img
          src="@/assets/images/logo.png"
          alt="Rick and Morty logotype"
          class="header__logo"
        />
      </router-link>
      <app-search-form></app-search-form>
    </div>
    <div class="header__wrapper">
      <app-nav class="header__nav"></app-nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppNav from "./AppNav.vue";
import AppSearchForm from "./AppSearchForm.vue";

export default defineComponent({
  name: "app-header",
  components: { "app-search-form": AppSearchForm, "app-nav": AppNav },
});
</script>
