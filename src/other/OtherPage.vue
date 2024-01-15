<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";

import { onMounted, ref } from "vue";

onMounted(async () => {
  const ns = new PhysicalSize(600, 400);
  await appWindow.setSize(ns);
});

</script>

<style scoped>
</style>
