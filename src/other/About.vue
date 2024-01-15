<template>
  <div class="page">
    <PageTitle title="关于"></PageTitle>
    <div class="content">
      <p>
        icamera ，直播桌面摄像头应用，简单实用，体积小，安装包仅有5 MB。
      </p>
      <p>
        如果有问题，请在 <a href="https://github.com/wflixu/icamera/issues">Github</a> 反馈!
      </p>
      <div class="actions">
        <a-button type="primary" @click="onBack">
          返回
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from './components/PageTitle.vue'

import { useRouter} from 'vue-router'
const router = useRouter();
const onBack = () =>{
  router.push('/home')
}
</script>

<style scoped></style>