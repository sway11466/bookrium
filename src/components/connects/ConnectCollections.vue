<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="connect in connects.list" :key="connect.id">
        <KindleCard v-if="connect.type === 'kindle'" :id="connect.id" />
        <PDFLocalStorageCard v-if="connect.type === 'pdfls'" :id="connect.id" />
        <ImgDirLocalStorageCard v-if="connect.type === 'imgdirls'" :id="connect.id" />
    </template>
  </div>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab @click="add" round padding="xs">
      <q-avatar square>
        <q-img src="add-link-cuteui-64x64.png" no-spinner />
      </q-avatar>
    </q-btn>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import KindleCard from 'src/components/connects/KindleCard.vue';
import PDFLocalStorageCard from 'src/components/connects/PDFLocalStorageCard.vue';
import ImgDirLocalStorageCard from 'src/components/connects/ImgDirLocalStorageCard.vue';
import { useConnectsStore } from 'src/stores/Connects';
const connects = useConnectsStore();
const router = useRouter();
function add() {
  router.push('/connects/new');
}
</script>
