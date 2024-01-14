import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./home/Home.vue";
import ConfigPage from "./config/ConfigPage.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/config", component: ConfigPage },
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export { router };
