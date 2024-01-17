<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted, getCurrentInstance } from "vue";
import {
  LogicalSize,
  appWindow,
} from "@tauri-apps/api/window";

import Camera from "./Camera.vue";
import SettingBar from "./SettingBar.vue";
import { useSystemStoreHook } from "../store";

const systemStore = useSystemStoreHook();
const config = systemStore.config;

const showSettings = ref(false);


const mouseenterHandler = (event: MouseEvent) => {
  showSettings.value = true;
};

const mouseleaveHandler = (event:MouseEvent) =>{
  showSettings.value = false;
}

onMounted(async () => {
  const cw = config.size ;
  const ph = new LogicalSize(cw ,cw+8)
  
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
