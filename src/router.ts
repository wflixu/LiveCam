import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "./home/Home.vue";
import ConfigPage from "./other/Config.vue";
import Exception from "./other/Exception.vue";
import AboutVue from "./other/About.vue";
import OtherPageVue from "./other/OtherPage.vue";

// const AsyncHome =
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  {
    path: "/other",
    component: OtherPageVue,
    children: [
      { path: "config", component: ConfigPage },
      { path: "error", component: Exception },
      { path: "about", component: AboutVue },
    ],
  },
];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export { router };
