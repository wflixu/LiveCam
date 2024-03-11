<template>
  <div class="page">
    <PageTitle :title="t('about.title')"></PageTitle>
    <div class="content">
      <p>
        {{ t('about.desc') }}
      </p>
      <p>
        {{ t('about.feedback') }}
    
      </p>
      <div class="actions">
        <a-button type="primary" @click="onBack">
          {{ t('btns.back') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from './components/PageTitle.vue'

import { useRouter } from 'vue-router'

import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const router = useRouter();
const onBack = () => {
  router.push('/home')
}
</script>

<style scoped></style>