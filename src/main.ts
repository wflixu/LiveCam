import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";
import "./styles.css";
import Antd from "ant-design-vue";
import App from "./App.vue";
import { router } from "./router";
import { pinia } from "./store";
import { i18n } from "./locale";

const app = createApp(App);
app.config.errorHandler = (err, instance, info) => {
  console.log(err, instance, info);
};
app.use(Antd);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");
