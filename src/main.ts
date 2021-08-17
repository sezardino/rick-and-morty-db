// vue
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// styles
import "@/assets/styles/index.scss";

// components
import Layouts from "@/layouts";
import UIComponents from "@/components/UI";
import Icons from "@/components/icons";

// create app
const app = createApp(App);

// register components/layouts/icons
Layouts.forEach((layout) => {
  app.component(layout.name, layout);
});
UIComponents.forEach((layout) => {
  app.component(layout.name, layout);
});
Icons.forEach((icon) => {
  app.component(icon.name, icon);
});

// register mixins/plugins/ mount app
app.use(store);
app.use(router);
app.mount("#app");
