<template>
  <div class="settings">
    <SettingOutlined :style="{color: 'white', fontSize: '20px'}" @click="clickHandler" />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import { PhysicalPosition, appWindow } from "@tauri-apps/api/window";
import {useRouter} from 'vue-router';

const router = useRouter()

const clickHandler = async () =>{
   router.push('/config')
}
</script>

<style scoped>
.settings {
  height: 32px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
