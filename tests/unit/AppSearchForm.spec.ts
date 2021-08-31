import { shallowMount, mount } from "@vue/test-utils";
import AppSearchForm from "@/components/AppSearchForm.vue";

describe("Search Form", () => {
  it("Search form rendered correctly", () => {
    const wrapper = shallowMount(AppSearchForm);
    expect(wrapper.exists()).toBeTruthy();
  });
  it("Function searchSubmit called when form submitted", () => {
    const wrapper = shallowMount(AppSearchForm);
    const searchSubmit = jest.fn();
    wrapper.vm.searchSubmit = searchSubmit;
    wrapper.find("form").trigger("submit");

    expect(searchSubmit).toHaveBeenCalled();
  });
  it("When input something to search input, ref query, is changed", () => {
    const testText = "some";
    const wrapper = shallowMount(AppSearchForm);
    const input = wrapper.find("input");
    input.setValue("");
    expect(wrapper.vm.query).toMatch("");
    input.setValue(testText);
    expect(wrapper.vm.query).toMatch(testText);
  });
});
