<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <router-link to="/" active-class="nav__link--active" class="nav__link">
          All Characters
        </router-link>
      </li>
      <li class="nav__item">
        <router-link
          to="/favorites"
          active-class="nav__link--active"
          class="nav__link"
        >
          Favorites
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-nav",
  // setup() {

  // },
});
</script>
