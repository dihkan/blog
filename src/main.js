import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import "./assets/genel.css";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faBars,
    faPhone,
    faHouse,
    faAnchor,
    faDragon,
    faChartArea,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPhone, faHouse, faBars, faAnchor, faDragon, faChartArea);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.use(router).component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");