<template>
  <q-page class="col">
    <NewConnectSelector v-if="showSelector" />
    <KindleEditor v-if="showKindle" :mode="mode" />
    <PDFLocalStorageEditor v-if="showPdfls" :mode="mode" />
    <ImgDirLocalStorageEditor v-if="showImgDirls" :mode="mode" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NewConnectSelector from 'src/components/connects/NewConnectSelector.vue';
import KindleEditor from 'src/components/connects/KindleEditor.vue';
import PDFLocalStorageEditor from 'src/components/connects/PDFLocalStorageEditor.vue';
import ImgDirLocalStorageEditor from 'src/components/connects/ImgDirLocalStorageEditor.vue';
import { useConnectsStore } from 'src/stores/Connects';
const route = useRoute();
const connects = useConnectsStore();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';

const showSelector = computed<boolean>(() => {
  return route.path.endsWith('/new');
})

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

const showImgDirls = computed<boolean>(() => {
  if (route.path.includes('/new')) { return route.path.endsWith('/imgdirls'); }
  const connectid = route.params.connectid as string;
  const connect = connects.get(connectid);
  return connect.type === 'imgdirls';
})
</script>
