<template>
  <section class="home">
    <h1 class="visually-hidden">Rick and Morty DB</h1>
    <div class="home__bg" ref="homeBg"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useGsap from "@/use/useGsap";

export default defineComponent({
  setup() {
    const { tl } = useGsap();
    const homeBg = ref(null);

    onMounted(() => {
      const header = document.querySelector(".header");
      const bg = homeBg.value;
      tl.set([header, bg], { opacity: 0 })
        .fromTo(
          bg,
          { y: "-=200%" },
          { y: 0, opacity: 1, ease: "bounce", duration: 1.2 }
        )
        .fromTo(header, { y: "-=100%" }, { y: 0, opacity: 1 });
    });

    return { homeBg };
  },
});
</script>
