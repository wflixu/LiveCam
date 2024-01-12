<template>
  <div class="camera" :style="styleObj">
    <video ref="vd" :style="vstyleObj"></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { ICameraProps } from "./interface";

const props = withDefaults(defineProps<ICameraProps>(), {
  width: '100px',
  circle: true,
  borderWidth: '2px',
  borderColor: "rebeccapurple",
});

const styleObj = computed(() => {
  return {
    width: props.width ,
    height: props.width,
  };
});

const vstyleObj = computed(() => {
  return {
    borderRadius: props.circle ? "50%" : "none",
    borderWidth: props.borderWidth ,
    borderColor: props.borderColor,
  };
});

const vd = ref<HTMLVideoElement>();
onMounted(() => {
  const constraints = { audio: false, video: { width: 720, height: 720 } };

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
}
video {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-style: solid;
  
}
</style>
