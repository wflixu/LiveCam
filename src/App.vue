<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted, getCurrentInstance } from "vue";
import {
  LogicalPosition,
  LogicalSize,
  PhysicalSize,
  appWindow,
} from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";
import Camera from "./Camera.vue";
import SettingBar from "./SettingBar.vue";

const showSettings = ref(false);

const width = ref("100px");
let unlisten: Function;
const initWin = async (w: number, h: number) => {

  const nw = w >= h - 15 ? w : h;
  width.value = nw + "px";
  const ns = new PhysicalSize(nw, nw + 15);
  await appWindow.setSize(ns);
};

listen<string>("tauri://resize", (event) => {
  console.log(event.payload);
  const { width, height } = event.payload as unknown as {
    width: number;
    height: number;
  };
  initWin(width, height)
    .then(() => {})
    .catch((err) => {});
}).then((fn) => {
  unlisten = fn;
});



const mouseenterHandler = (event: MouseEvent) => {
  showSettings.value = true;
};

const mouseleaveHandler = (event:MouseEvent) =>{
  showSettings.value = false;
}
onMounted(async () => {
  const psize = await appWindow.innerSize();
  initWin(psize.width, psize.height)
    .then(() => {})
    .catch((err) => {});
 
});

onUnmounted(() => {
  if (unlisten) {
    unlisten();
  }
});


</script>

<template>
  <div class="container"  @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
    <Camera :width="width" />
    <SettingBar v-show="showSettings" />
  </div>
</template>

<style scoped>
.container {

  position: relative;
  border-radius: 50%;
}
</style>
