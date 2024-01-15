<template>
  <div class="settings">
    <SettingOutlined :style="iconStyle" @click="clickHandler('config')" />
    <SyncOutlined :style="iconStyle" @click="toggleShape" />
    <InfoCircleOutlined :style="iconStyle" @click="clickHandler('about')" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import {
  SettingOutlined,
  InfoCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useSystemStoreHook } from "../store";
const router = useRouter();

const systemStore = useSystemStoreHook();

const iconStyle = reactive({
  color: "white",
  fontSize: "20px",
});
const clickHandler = async (key: string) => {
  router.push(`/other/${key}`);
};
const toggleShape = () => {
  systemStore.toggleShape();
   window.location.reload()
};
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
  gap: 12px;
}
</style>
