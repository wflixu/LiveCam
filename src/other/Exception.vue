<template>
  <div class="page">
    <PageTitle :title="t('exception.title')"></PageTitle>
    <div class="content">
      <p>
        {{ t('exception.tip') }}
      </p>
      <div class="actions">
        <a-button type="primary" @click="onBack">
          {{ t("exception.refresh") }}
        </a-button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import PageTitle from './components/PageTitle.vue';
import { useRouter} from 'vue-router'

import { useI18n } from 'vue-i18n';
import { useSystemStoreHook } from '../store';
const {t} =  useI18n()

const systemStore = useSystemStoreHook()

const router = useRouter();
const onBack = () =>{
  router.push('/home')
  systemStore.refresh()
}

</script>

<style scoped></style>