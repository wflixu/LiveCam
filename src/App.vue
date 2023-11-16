<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { LogicalPosition, appWindow } from "@tauri-apps/api/window";
const vd = ref<HTMLVideoElement>();
onMounted(() => {
  const constraints = { audio: true, video: { width: 720, height: 720 } };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (mediaStream) {
      if (vd.value) {
        vd.value.srcObject = mediaStream;
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
const pos = reactive({ screenX, screenY });
const flag = ref(false);
const onMousedown = async (e: MouseEvent) => {
  flag.value = true;
  // const position = await appWindow.innerPosition();
  // const factor = await appWindow.scaleFactor();
  // const LogicalPosition = position.toLogical(factor);
  // const size = await appWindow.innerSize();
  // const logicalSize = size.toLogical(factor);
  // console.warn(e.screenX, e.screenY);
  // console.warn(LogicalPosition, size, logicalSize);
};
const onMousemove = async (e: MouseEvent) => {
  // console.log(e.screenX, e.screenY);
  if (flag.value) {
    await appWindow.setPosition(
      new LogicalPosition(e.screenX - 140, e.screenY - 140)
    );
  }
};
const onMouseup = () => {
  flag.value = false;
};
const onMouseover = async () => {
  await appWindow.setDecorations(true);
};
const onMouseout = async () => {
  await appWindow.setDecorations(false);
};
</script>

<template>
  <div
    class="container"
    @mousedown="onMousedown"
    @mousemove="onMousemove"
    @mouseup="onMouseup"
    @mouseenter="onMouseover"
    @mouseleave="onMouseout"
  >
    <video class="v" ref="vd"></video>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
video {
  width: 100vmin;
  height: 100vin;
  box-sizing: border-box;
  border-radius: 50%;
  border: 4px solid rebeccapurple;
}
</style>
