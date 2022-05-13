import { createRouter, createWebHistory } from "vue-router";
const webHistory = new createWebHistory();

import main from "../views/main.vue";
import currency from "../views/currency.vue";
import fastTyping from "../views/fastTyping.vue";

const routes = [{
        path: "/",
        component: main,
        name: "main",
    },
    {
        path: "/currency",
        component: currency,
        name: "currency",
    },
    {
        path: "/fastTyping",
        component: fastTyping,
        name: "fastTyping",
    },
];

const router = new createRouter({
    history: webHistory,
    linkExactActiveClass: "active",
    routes,
});

export default router;