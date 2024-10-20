<script setup lang="ts">
import { onMounted, ref } from "vue";
import { LoadingOutlined } from '@ant-design/icons-vue'
import {
  LogicalSize,
  getCurrentWindow,
} from "@tauri-apps/api/window";

import Camera from "./Camera.vue";
import SettingBar from "./SettingBar.vue";
import { useSystemStoreHook } from "../store";
import { useCheckAvaibleCamrea, useWinMove } from "../hooks";
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const appWindow = getCurrentWindow();

const {
  mousedownHandler,
  mouseupHandler,
  mousemoveHandler,
  mouseleaveHandler,
} = useWinMove();

const systemStore = useSystemStoreHook();
const config = systemStore.config;

const showSettings = ref(false);

useCheckAvaibleCamrea()

const mouseenterHandler2 = (event: MouseEvent) => {
  showSettings.value = true;
};

const mouseleaveHandler2 = (event: MouseEvent) => {
  showSettings.value = false;
}

onMounted(async () => {
  const cw = config.size;
  const ph = new LogicalSize(cw, config.circle ? cw : cw / 3 * 2)
  await appWindow.setSize(ph);
});


</script>

<template>
  <div class="home" @mouseenter="mouseenterHandler2" @mouseleave="mouseleaveHandler2">
    <div class="mask" @mousedown="mousedownHandler" @mouseup="mouseupHandler" @mousemove="mousemoveHandler"
      @mouseleave="mouseleaveHandler">
    </div>
    <template v-if="systemStore.devicesChecking">
      <div class="loading">
        <LoadingOutlined :style="{ 'font-size': '30px', color: '#4C8B3B' }" />
        <p>
          {{ t('home.loading_device') }}...
        </p>
      </div>
    </template>
    <template v-else>
      <Camera />
    </template>
    <SettingBar v-show="showSettings" />
  </div>
</template>

<style scoped>
.home {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 32px;
    cursor: move;
    z-index: 1;
  }

  .loading {
    text-align: center;

    p {
      color: #666;
    }
  }
}
</style>
