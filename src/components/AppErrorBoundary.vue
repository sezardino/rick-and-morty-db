<template>
  <my-error v-if="error"></my-error>
  <slot v-else></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-error-boundary",
  props: { error: { type: Boolean, required: true } },
});
</script>
