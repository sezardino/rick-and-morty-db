import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

import { LAYOUTS } from "@/helpers/const";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: { layout: LAYOUTS.DEFAULT },
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    meta: { layout: LAYOUTS.DEFAULT },
    component: () => import("@/views/Favorites.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name as string;
  next();
});

export default router;
