<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link to="/" class="header__logo">
        <img src="@/assets/images/logo.png" alt="Rick and Morty logotype" />
      </router-link>
      <div class="header__search">
        <slot name="header-search"></slot>
      </div>
      <div class="header__themes">
        <slot name="header-themes"></slot>
      </div>
    </div>
    <div class="header__wrapper">
      <slot name="header-nav" class="header__nav"></slot>
    </div>
  </header>
</template>
