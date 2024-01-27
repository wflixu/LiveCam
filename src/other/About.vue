<template>
  <div class="page">
    <PageTitle title="About"></PageTitle>
    <div class="content">
      <p>
        LiveCam is a live desktop camera application. It is not only simple and practical, but also small in size, with an
        installation package of only 5MB.
      </p>
      <p>
        If you encounter any problems, you can give feedback here <a href="https://github.com/wflixu/icamera/issues">Github</a>, and we will deal with it in time.
      </p>
      <div class="actions">
        <a-button type="primary" @click="onBack">
          Back
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from './components/PageTitle.vue'

import { useRouter } from 'vue-router'
const router = useRouter();
const onBack = () => {
  router.push('/home')
}
</script>

<style scoped></style>