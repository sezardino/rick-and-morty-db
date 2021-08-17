<template>
  <form class="search-form" @submit.prevent="searchSubmit">
    <input
      type="text"
      class="search-form__input"
      placeholder="Start typing to search..."
      v-model="query"
    />
    <button class="search-form__button">
      <img src="@/assets/images/search-ico.svg" class="search-form__icon" />
      <span class="visually-hidden">Search</span>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "app-search-form",
  setup() {
    const query = ref("");
    const router = useRouter();

    const searchSubmit = () => {
      router.push(`/search?s=${query.value}`);
      query.value = "";
    };

    return { query, searchSubmit };
  },
});
</script>
