import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { changeCssProperties } from "./../helpers/functions";
import { themes } from "./../helpers/const";
import useGsap from "./useGsap";

const BG_COLORS: { [key: string]: string } = {
  DEFAULT: "#ffffff",
  DARK: "#333333",
};

const useThemes = () => {
  const { tl } = useGsap();
  const store = useStore();

  const changeBg = (theme: string) => {
    const upperTheme = theme.toUpperCase();
    const currentColor = BG_COLORS[upperTheme];
    const getOldTheme = Object.keys(BG_COLORS).filter(
      (item) => item !== upperTheme
    )[0];
    const oldColor = BG_COLORS[getOldTheme];

    const body = document.querySelector("body");
    tl.fromTo(
      body,
      { backgroundColor: oldColor },
      { backgroundColor: currentColor }
    );
  };

  const theme = computed(() => {
    return store.getters["app/theme"];
  });

  watch(theme, (newValue: string) => {
    changeCssProperties(newValue);
    changeBg(newValue);
  });

  const handler = (value: string) => {
    store.dispatch("app/changeTheme", value);
  };

  onMounted(async () => {
    store.dispatch("app/getTheme");
    changeCssProperties(theme.value);
  });

  return { handler, themes, theme };
};

export default useThemes;
