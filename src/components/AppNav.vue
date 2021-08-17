<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item" v-for="link in links" :key="link.path">
        <router-link
          :to="link.path"
          :class="{
            nav__link: true,
            'nav__link--active': $route.name === link.name,
          }"
        >
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "app-nav",
  setup() {
    const router = useRouter();

    const links = computed(() => {
      const routes = router.options.routes.filter((route) => route.meta?.inNav);
      const neededRoutes = routes.map((item) => {
        item.path = item.path.replace(":page", "");
        return item;
      });

      return neededRoutes;
    });

    return { links };
  },
});
</script>
