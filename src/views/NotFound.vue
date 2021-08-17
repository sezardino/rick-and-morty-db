<template>
  <section class="not-found" ref="notFound">
    <h1 class="not-found__title" ref="title">404</h1>
    <p class="not-found__subtitle" ref="subtitle">
      Page with path "{{ routeString }}", are not exist
    </p>
    <router-link to="/" class="not-found__link" ref="link"
      >To Home Page</router-link
    >
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import useGsap from "@/use/useGsap";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { tl } = useGsap();

    const notFound = ref(null);

    const routeString = computed(() => {
      const back = router.options.history.state.back;
      if (back) {
        return back;
      } else {
        return route.path;
      }
    });

    onMounted(() => {
      const section = notFound.value as unknown as HTMLElement;
      const sectionChildren = section.children;
      tl.set(sectionChildren, { opacity: 0 })
        .fromTo(
          sectionChildren[0],
          { fontSize: 0 },
          { fontSize: "", opacity: 1 }
        )
        .fromTo(
          [sectionChildren[1], sectionChildren[2]],
          { x: "-=100%" },
          { x: 0, opacity: 1, stagger: 0.4 }
        );
    });

    return { notFound, routeString };
  },
});
</script>
