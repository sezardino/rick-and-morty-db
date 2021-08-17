<template>
  <div class="themes">
    <h2 class="themes__title">Choose theme</h2>
    <ul class="themes__list">
      <li class="themes__item" v-for="theme in themes" :key="theme.value">
        <button
          :class="{
            themes__button: true,
            [`themes__button--${theme.value}`]: true,
            'themes__button--current': theme.value === current,
          }"
          @click.prevent="clickHandler(theme.value)"
          :disabled="theme.value === current"
        >
          {{ theme.label }}
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
  setup(_, context) {
    const clickHandler = (value: string) => {
      context.emit("themeChange", value);
    };

    return { clickHandler };
  },
});
</script>
