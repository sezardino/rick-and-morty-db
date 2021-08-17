<template>
  <button class="button table__button">
    <component :is="icon + 'icon'" v-if="icon"></component>
    <star-icon></star-icon>
    <span class="visually-hidden" v-if="hidden"> {{ hidden }} </span>
    <span class="button__text">{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: false,
    },
    hidden: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
});
</script>
