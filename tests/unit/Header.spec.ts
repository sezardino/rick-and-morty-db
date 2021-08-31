import { shallowMount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: { template: "<h1>Test</h1>" },
    },
  ],
});

describe("Header", () => {
  const slotText = "slot text";

  it("Header renders", () => {
    const wrapper = shallowMount(AppHeader);
    expect(wrapper.html()).toMatch("<header");
  });

  it("Header render slot 'header-search'", () => {
    const wrapper = shallowMount(AppHeader, {
      slots: {
        "header-search": slotText,
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toMatch(slotText);
  });
  it("Header render slot 'header-themes'", () => {
    const wrapper = shallowMount(AppHeader, {
      slots: {
        "header-themes": slotText,
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toMatch(slotText);
  });
  it("Header render slot 'header-nav'", () => {
    const wrapper = shallowMount(AppHeader, {
      slots: {
        "header-nav": slotText,
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toMatch(slotText);
  });
});
