<template>
  <section class="not-found">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__subtitle">
      Page with path "{{ $route.path }}", are not exist
    </p>
    <router-link to="/" class="not-found__link">To Home Page</router-link>
  </section>
</template>
