<template>
  <div class="page">
    <PageTitle title="错误"></PageTitle>
    <div class="content">
      <p>
        没有可用的设备, 请检查摄像设备是否正确安装，然后重启应用！
      </p>
      <div class="actions">
        <a-button type="primary" @click="onBack">
          重试
        </a-button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import PageTitle from './components/PageTitle.vue';
import { useRouter} from 'vue-router'
const router = useRouter();
const onBack = () =>{
  router.push('/home')
}
</script>

<style scoped></style>