import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import dotEnv from "dotenv";
import elementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./assets/index.css";
import "./assets/genel.css";

const app = createApp(App);
app.use(dotEnv);
app.use(elementPlus);

app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.mount("#app");