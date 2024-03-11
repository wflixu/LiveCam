import { createI18n } from "vue-i18n";
import { en_message } from "./en";
import { zh_cn_message } from "./zh_cn";

let systemLocale = window.navigator.language;

const i18n = createI18n({
  legacy: false,
  locale: systemLocale != "zh-CN" ? "en" : "zh-CN",
  fallbackLocale: "en", // set fallback locale
  messages: {
    ...zh_cn_message,
    ...en_message,
  }, // set locale messages
});

export { i18n };
