<template>
  <div class="config">
    <div
      class="title"
      @mousedown="mousedownHandler"
      @mouseup="mouseupHandler"
      @mousemove="mousemoveHandler"
      @mouseleave="mouseleaveHandler"
    >
      配置
    </div>
    <div class="box">
      <div class="row">
        <div class="item left">现在摄像设备：</div>
        <div class="item right">
          <a-select
            ref="select"
            v-model:value="deviceId"
            style="width: 160px"
            :options="deviceOptions"
            @change="handleChange"
          ></a-select>
        </div>
      </div>
      <div class="row">
        <div class="item left">圆形：</div>
        <div class="item right">
          <a-switch v-model:checked="isCircle" />
        </div>
      </div>
      <div class="row">
        <div class="item left">尺寸：</div>
        <div class="item right">
          <a-input-number
            id="inputNumber"
            v-model:value="size"
            :min="20"
            :max="720"
          />
        </div>
      </div>
      <div class="row">
        <div class="item left">边框：</div>
        <div class="item right">
          <a-switch v-model:checked="hasBorder" />
        </div>
      </div>
      <div class="row">
        <div class="item left">边框宽度：</div>
        <div class="item right">
          <a-input-number
            id="inputNumber"
            v-model:value="borderWidth"
            :min="0"
            :max="200"
          />
        </div>
      </div>
      <div class="row">
        <div class="item left">边框颜色：</div>
        <div class="item right">
          <input type="color" :value="borderColor" @change="onColorChange" />
        </div>
      </div>
    </div>
    <div class="actions">
      <a-button type="primary" class=""  @click="onSaveConfig"> 保存 </a-button>
      <a-button  danger @click="onBack">返回 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";
import { SelectProps } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSystemStoreHook } from "../store";
import { useWinMove } from "../hooks";

const {
  mousedownHandler,
  mouseupHandler,
  mousemoveHandler,
  mouseleaveHandler,
} = useWinMove();

const router = useRouter();
const systemStore = useSystemStoreHook();

const deviceOptions = ref<SelectProps["options"]>([]);
const config = systemStore.config;
const deviceId = ref(systemStore.deviceId);
const isCircle = ref<boolean>(config.circle);
const size = ref<number>(config.size);
const hasBorder = ref<boolean>(config.hasBorder);
const borderWidth = ref<number>(config.borderWidth);
const borderColor = ref<string>(config.borderColor);

const handleChange = () => {};
const onColorChange = (evt: any ) => {
  borderColor.value = evt.target.value;
};

const onSaveConfig = async () => {
  if (deviceId.value) {
    systemStore.setDeviceId(deviceId.value);
  }
  systemStore.updateConfig({
    size: size.value,
    circle: isCircle.value,
    hasBorder: hasBorder.value,
    borderWidth: borderWidth.value,
    borderColor: borderColor.value,
  });

  router.push("/");
};

const onBack = () =>{
  router.push("/");
}

onMounted(async () => {
  const ns = new PhysicalSize(600, 400);
  await appWindow.setSize(ns);

  const deviceInfos = await navigator.mediaDevices.enumerateDevices();
  if (Array.isArray(deviceInfos)) {
    deviceOptions.value = deviceInfos
      .filter((item) => item.kind == "videoinput")
      .map((item) => {
        return {
          label: item.label,
          value: item.deviceId,
        };
      });
  }
  console.log(deviceInfos);
});
</script>

<style scoped>
.config {
  background-color: #fff;
  .title {
    height: 32px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    background-color: bisque;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
  }
  .actions {
    padding: 16px 32px;
    display: flex;

    gap: 16px ;
  }
  .box {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 24px;
  }
  .row {
    padding: 4px 8px;
    margin-top: 4px;
    border-bottom: 1px solid #ddd;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 12px;
    align-items: center;
    .left {
    }
    .right {
      display: inline-flex;
      justify-content: end;
    }
  }
}
</style>
