<template>
  <div class="error" v-if="error">
    <h2 class="error__title">Something go's wrong, try to refresh page</h2>
    <img src="@/assets/images/error.png" alt="error" class="error__img" />
  </div>
  <slot v-else></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-error-boundary",
  props: { error: { type: Boolean, required: true } },
});
</script>
