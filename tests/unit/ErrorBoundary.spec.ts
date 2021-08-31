import { shallowMount } from "@vue/test-utils";
import AppErrorBoundary from "@/components/AppErrorBoundary.vue";

describe("Error Boundary", () => {
  it("Render Error component if prop error equals true", () => {
    const wrapper = shallowMount(AppErrorBoundary, { props: { error: true } });
    expect(wrapper.find(".error").exists()).toBeTruthy();
  });
  it("Render components if prop error equals false", () => {
    const slot = "some slot text";
    const wrapper = shallowMount(AppErrorBoundary, {
      props: { error: false },
      slots: {
        default: [slot],
      },
    });
    expect(wrapper.text()).toMatch(slot);
  });
});
