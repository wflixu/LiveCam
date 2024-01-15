<template>
  <div
    class="title"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
    @mousemove="mousemoveHandler"
    @mouseleave="mouseleaveHandler"
  >
   {{title}}
  </div>
</template>

<script setup lang="ts">
import { useWinMove } from "../../hooks";
const {
  mousedownHandler,
  mouseupHandler,
  mousemoveHandler,
  mouseleaveHandler,
} = useWinMove();

const props = defineProps({
    title: String
})

</script>

<style scoped>
.title {
  height: 32px;
  font-size: 18px;
  font-weight: 600;
  color: #F1f1f1;
  background-color: #4C8B3B;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
}
</style>
