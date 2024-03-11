<script setup lang="ts">
import { onMounted } from 'vue';

const themeConfig = {
  token: {
    colorPrimary: '#4C8B3B',
  },
}

onMounted(async () => {
 
})

</script>

<template>
  <a-config-provider :theme="themeConfig">
    <router-view></router-view>
  </a-config-provider>
</template>

<style scoped></style>
