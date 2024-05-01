<template>
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card flat bordered>
      <q-item tag="label" class="q-pa-sm">
        <q-item-section side>
          <q-radio v-model="type" val="kindle" />
        </q-item-section>
        <q-item-section side>
          <q-img src="kindle-48x48.svg" width="96px" />
        </q-item-section>
        <q-item-section top>
          <q-item-label>Kindle</q-item-label>
          <q-item-label caption>Collect Kindle books purchased from Amazon.</q-item-label>
        </q-item-section>
        <q-item-section v-if="type === 'kindle'" side>
          <q-btn @click="next" label="next" padding="md" color="primary" unelevated no-caps />
        </q-item-section>
      </q-item>
    </q-card> 

    <q-card flat bordered>
      <q-item tag="label" class="q-pa-sm">
        <q-item-section side>
          <q-radio v-model="type" val="pdfls" />
        </q-item-section>
        <q-item-section side>
          <q-img src="pdf.svg" width="96px" />
        </q-item-section>
        <q-item-section top>
          <q-item-label>PDF (Local Storage)</q-item-label>
          <q-item-label caption>Collects PDFs in a specified folder recursively.</q-item-label>
        </q-item-section>
        <q-item-section v-if="type === 'pdfls'" side>
          <q-btn @click="next" label="next" padding="md" color="primary" unelevated no-caps />
        </q-item-section>
      </q-item>
    </q-card>

    <q-card flat bordered>
      <q-item tag="label" class="q-pa-sm">
        <q-item-section side>
          <q-radio v-model="type" val="imgdirls" />
        </q-item-section>
        <q-item-section side>
          <q-img src="img-folder.svg" width="96px" />
        </q-item-section>
        <q-item-section top>
          <q-item-label>Image Folder (Local Storage)</q-item-label>
          <q-item-label caption>Collects PDFs in a specified folder recursively.</q-item-label>
        </q-item-section>
        <q-item-section v-if="type === 'imgdirls'" side>
          <q-btn @click="next" label="next" padding="md" color="primary" unelevated no-caps />
        </q-item-section>
      </q-item>
    </q-card>

  </div>
</template>

<style scoped>
.q-card {
  width: 100%;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ConnectType } from 'src/stores/ConnectTypes';
const router = useRouter();
const type: Ref<ConnectType | ''> = ref('');

function next() {
  router.push(`/connects/new/${type.value}`);
}
</script>
