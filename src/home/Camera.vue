<template>
  <video ref="vd" :style="vstyleObj" @ended="onErrorHandler"></video>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useSystemStoreHook } from "../store";
import { useRouter } from "vue-router";


const router = useRouter()

const systemStore = useSystemStoreHook();

const config = systemStore.config;


const onErrorHandler = (err: Event) =>{
  router.push('/other/error')
}

const vstyleObj = computed(() => {
  return {
    borderRadius: systemStore.config.circle ? "50%" : "none",
    borderWidth: config.hasBorder ? config.borderWidth + 'px' : '0px',
    borderColor: config.borderColor,
  };
});

const vd = ref<HTMLVideoElement>();

onMounted(() => {

  const constraints = { audio: false, video: { width: 720, height: config.circle? 720: 720/3*2, deviceId: systemStore.deviceId ?? undefined }, };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (media) {
      if (vd.value) {
        vd.value.srcObject = media;
        vd.value.onloadedmetadata = function (e) {
          if (vd.value) {
            vd.value.play();
          }
        };
      }
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
      router.push('/other/error')
       
    }); // 总是在最后检查错误
});
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-style: solid;
}
</style>
