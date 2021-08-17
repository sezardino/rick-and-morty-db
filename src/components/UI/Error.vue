<template>
  <div class="error">
    <h2 class="error__title">Something gows wrong, try to refresh page</h2>
    <img src="@/assets/images/error.png" alt="" class="error__img" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "my-error",
});
</script>
