<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { LogicalSize, getCurrentWindow} from "@tauri-apps/api/window";

import { onMounted, ref } from "vue";

onMounted(async () => {
  const appWindow = getCurrentWindow();
  const ns = new LogicalSize(600, 400);
  await appWindow.setSize(ns);
});

</script>

<style scoped>
</style>
