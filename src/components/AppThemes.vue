<template>
  <div class="themes home__themes">
    <h2 class="themes__title">Thoose theme</h2>
    <ul class="themes__list">
      <li class="themes__item" v-for="theme in themes" :key="theme.value">
        <button
          :class="`themes__button ${
            theme.value === current ? 'themes__button--active' : ''
          } themes__button--${theme.value}`"
          @click.prevent="clickHandler(theme.value)"
          :disabled="theme.value === current"
        >
          <img :src="theme.img" alt="Portal theme" class="themes__img" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-themes",
  props: { themes: Array, current: { type: String, default: "default" } },
  emits: ["themeChange"],

  methods: {
    clickHandler(value: string) {
      this.$emit("themeChange", value);
    },
  },
});
</script>
