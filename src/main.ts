import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";
import "./styles.css";
import Antd from "ant-design-vue";
import App from "./App.vue";
import { router } from "./router";
import { pinia } from "./store";

const app = createApp(App);

app.use(Antd);
app.use(pinia);
app.use(router);

app.mount("#app");
