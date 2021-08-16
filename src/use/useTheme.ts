import { computed, watch } from "vue";
import { useStore } from "vuex";
import { changeCssProperties } from "./../helpers/functions";
import { themes } from "./../helpers/const";

const useThemes = () => {
  const store = useStore();

  const theme = computed(() => {
    return store.getters["app/theme"];
  });

  watch(theme, (newValue: string) => {
    changeCssProperties(newValue);
  });

  const handler = (value: string) => {
    store.dispatch("app/changeTheme", value);
  };

  return { handler, themes, theme };
};

export default useThemes;
