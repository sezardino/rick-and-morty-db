<template>
  <form class="search-form" @submit.prevent>
    <input
      type="text"
      class="search-form__input"
      placeholder="Start typing to search..."
    />
    <button class="search-form__button">
      <img src="@/assets/images/search-ico.svg" class="search-form__icon" />
      <span class="visually-hidden">Search</span>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-search-form",
  // setup() {

  // },
});
</script>
