<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted, getCurrentInstance } from "vue";
import {
  PhysicalSize,
  appWindow,
} from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";
import Camera from "./Camera.vue";
import SettingBar from "./SettingBar.vue";
import { useSystemStoreHook } from "../store";

const systemStore = useSystemStoreHook();
const showSettings = ref(false);

const config = systemStore.config;
const width = ref(config.size + 'px');

const mouseenterHandler = (event: MouseEvent) => {
  showSettings.value = true;
};



const mouseleaveHandler = (event:MouseEvent) =>{
  showSettings.value = false;
}
onMounted(async () => {
  const cw = systemStore.config.size ;
  const ph = new PhysicalSize(cw ,cw+8)
  await appWindow.setSize(ph);
});




</script>

<template>
  <div class="container"  @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
    <Camera />
    <SettingBar v-show="showSettings" />
  </div>
</template>

<style scoped>
.container {
  position: relative;
}
</style>
