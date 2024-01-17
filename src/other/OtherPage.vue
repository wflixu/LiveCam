<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { LogicalSize, appWindow} from "@tauri-apps/api/window";

import { onMounted, ref } from "vue";

onMounted(async () => {

  const ns = new LogicalSize(600, 400);
  await appWindow.setSize(ns);
});

</script>

<style scoped>
</style>
