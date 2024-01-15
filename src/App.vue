<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSystemStoreHook } from "./store";
const router = useRouter();
const systemStore = useSystemStoreHook();
const checkAvailableDevice = () => {
  setTimeout(async () => {
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();
    console.log(deviceInfos)
    if (!Array.isArray(deviceInfos)) {
      router.push("/other/error");
    }
    const available = deviceInfos.find((item) => {
      return item.kind == "videoinput" && item.deviceId;
    });
    if (available) {
      systemStore.setDeviceId(available.deviceId);
    } else {
      router.push("/other/error");
    }
  }, 500);
};

onMounted( () => {
  checkAvailableDevice();
});
</script>

<template>
    <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#4C8B3B',
      },
    }"
  >
     <router-view></router-view>
  </a-config-provider>
 
</template>

<style scoped></style>
