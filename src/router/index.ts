import Home from "@/views/Home.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { LAYOUTS } from "@/helpers/const";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Rick and Morty DataBase",
    meta: { layout: LAYOUTS.DEFAULT },
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    meta: { layout: LAYOUTS.DEFAULT },
    component: () => import("@/views/Search.vue"),
  },
  {
    path: "/favorites",
    redirect: "/favorites/1",
  },
  {
    path: "/characters",
    redirect: "/characters/1",
  },
  {
    path: "/characters/:page",
    name: "All Characters",
    meta: { layout: LAYOUTS.DEFAULT, inNav: true },
    component: () => import("@/views/Characters.vue"),
  },
  {
    path: "/favorites/:page",
    name: "Favorites",
    meta: { layout: LAYOUTS.DEFAULT, inNav: true },
    component: () => import("@/views/Favorites.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const name = to.name as string;
  if (to.params.page) {
    document.title = `Page ${to.params.page} | ${name}`;
  } else {
    document.title = to.name as string;
  }
  next();
});

export default router;
