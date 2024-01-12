<template>
  <div
    class="settings"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
    @mousemove="mousemoveHandle"
  ></div>
</template>

<script setup lang="ts">
import { PhysicalPosition, appWindow } from "@tauri-apps/api/window";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";

const move = ref(true);
const lastP = ref<number[]>([]);
const mousedownHandler = (evt: MouseEvent) => {
  const { screenX, screenY, pageX, pageY } = evt;
  move.value = true;
  lastP.value = [screenX, screenY, pageX, pageY];
};
const mouseupHandler = (evt: MouseEvent) => {
  console.log(" mouseup");
  move.value = false;
  
};

const mousemoveHandle = (evt: MouseEvent) => {
  if (move.value) {
    console.log("mousemove");
    const { screenX, screenY, pageX, pageY } = evt;
    const [sX, sY, pX, pY] = lastP.value;
    const ph = new PhysicalPosition(
      screenX - pageX + (screenX - sX),
      screenY - pageY + (screenY - sY)
    );
    appWindow
      .setPosition(ph)
      .then((value) => {
        console.log("after set position");
        lastP.value = [screenX, screenY, pageX, pageY]
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const cis = getCurrentInstance();
onMounted(() => {
  console.log(cis?.vnode.el);
});
</script>

<style scoped>
.settings {
  height: 32px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: coral;
}
</style>
