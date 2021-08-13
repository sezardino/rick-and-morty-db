import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/index.scss";

import Layouts from "@/layouts";
import UIComponents from "@/components/UI";
import Icons from "@/components/icons";

const app = createApp(App);

Layouts.forEach((layout) => {
  app.component(layout.name, layout);
});
UIComponents.forEach((layout) => {
  app.component(layout.name, layout);
});
Icons.forEach((icon) => {
  app.component(icon.name, icon);
});

app.use(store);
app.use(router);
app.mount("#app");
