import { createPinia, defineStore } from "pinia";
import { reactive, ref, toValue } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { IConfig } from "./interface";

const pinia = createPinia();
const CONFIG_KEY = "ICAMERA_CONFIG";
const DEVICE_key = "ICAMERA_DEVICE_ID";
const configStr = window.localStorage.getItem(CONFIG_KEY);

const useSystemStoreHook = defineStore("system", () => {
  const config = reactive<IConfig>(
    configStr
      ? JSON.parse(configStr)
      : {
          size: 200,
          circle: true,
          hasBorder: true,
          borderWidth: 2,
          borderColor: "#999999",
        }
  );

  const updateConfig = (newConfig: IConfig) => {
    window.localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
    Object.assign(config, newConfig);
  };
  const deviceId = useLocalStorage(
    "deviceId",
    window.localStorage.getItem(DEVICE_key)
  );
  const setDeviceId = (id: string) => {
    deviceId.value = id;
    window.localStorage.setItem(DEVICE_key, id);
  };
  const toggleShape = () => {
    config.circle = !config.circle;
    window.localStorage.setItem(CONFIG_KEY, JSON.stringify(toValue(config)));
  };
  return {
    config,
    updateConfig,
    deviceId,
    setDeviceId,
    toggleShape,
  };
});

export { pinia, useSystemStoreHook };
