<template>
  <q-page class="col">
    <NewConnectSelector v-if="$route.path.endsWith('/new')" />
    <KindleSetting v-if="showKindle" :mode="mode" />
    <PDFLocalStorageSetting v-if="showPdfls" :mode="mode" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NewConnectSelector from 'src/components/connects/NewConnectSelector.vue';
import KindleSetting from 'src/components/connects/KindleSetting.vue';
import PDFLocalStorageSetting from 'src/components/connects/PDFLocalStorageSetting.vue';
import { useConnectsStore } from 'src/stores/Connects';
const route = useRoute();
const connects = useConnectsStore();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';

const showKindle = computed<boolean>(() => {
  if (route.path.includes('/new')) { return route.path.endsWith('/kindle'); }
  const connectid = route.params.connectid as string;
  const connect = connects.get(connectid);
  return connect.type === 'kindle';
})

const showPdfls = computed<boolean>(() => {
  if (route.path.includes('/new')) { return route.path.endsWith('/pdfls'); }
  const connectid = route.params.connectid as string;
  const connect = connects.get(connectid);
  return connect.type === 'pdfls';
})
</script>
