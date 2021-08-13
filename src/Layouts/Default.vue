<template>
  <app-header></app-header>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";

export default defineComponent({
  name: "default-layout",
  components: { "app-header": AppHeader },
});
</script>
