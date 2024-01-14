<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted, getCurrentInstance } from "vue";
import {
  PhysicalSize,
  appWindow,
} from "@tauri-apps/api/window";
import { listen } from "@tauri-apps/api/event";
import Camera from "./Camera.vue";
import SettingBar from "./SettingBar.vue";



</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
