<template>
  <div
    class="camera"
    :style="styleObj"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
    @mousemove="mousemoveHandler"
    @mouseleave="mouseleaveHandler"
  >
    <video ref="vd" :style="vstyleObj"></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useWinMove } from "../hooks";
import { useSystemStoreHook } from "../store";

const {
  mousedownHandler,
  mouseupHandler,
  mousemoveHandler,
  mouseleaveHandler,
} = useWinMove();


const systemStore = useSystemStoreHook();

const config = systemStore.config;


const styleObj = computed(() => {
  return {
    width: config.size + 'px',
    height: config.size + 'px',
  };
});

const vstyleObj = computed(() => {
  return {
    borderRadius: config.circle ? "50%" : "none",
    borderWidth: config.hasBorder? config.borderWidth + 'px' : '0px',
    borderColor: config.borderColor,
  };
});

const vd = ref<HTMLVideoElement>();

onMounted(() => {
 
  const constraints = { audio: false, video: { width: 720, height: 720, deviceId: systemStore.deviceId! },  };
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
    }); // 总是在最后检查错误
});
</script>

<style scoped>
.camera {
  border-radius: 50%;
  cursor: move;
  background-color: aqua;
}
video {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-style: solid;
}
</style>
