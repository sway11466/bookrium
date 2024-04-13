<template>
  <q-list>

    <q-item tag="label" class="q-mt-md">
      <q-item-section side top>
        <q-radio v-model="type" val="kindle" />
      </q-item-section>
      <q-item-section side top>
        <q-img src="kindle-48x48.svg" width="48px" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Kindle</q-item-label>
        <q-item-label caption>Collect Kindle books purchased from Amazon.</q-item-label>
        <div class="q-ma-md">
          <template  v-if="type === 'kindle'">
            <q-btn @click="next" label="next" padding="xs 8em" color="primary" unelevated no-caps />
          </template>
        </div>
      </q-item-section>
    </q-item>

    <q-item tag="label" class="q-mt-md">
      <q-item-section side top>
        <q-radio v-model="type" val="pdfls" />
      </q-item-section>
      <q-item-section side top>
        <q-img src="pdf-47x47.png" width="48px" />          
      </q-item-section>
      <q-item-section>
        <q-item-label>PDF (Local Storage)</q-item-label>
        <q-item-label caption>Collects PDFs in a specified folder recursively.</q-item-label>
        <div class="q-ma-md">
          <template  v-if="type === 'pdfls'">
            <q-btn @click="next" label="next" padding="xs 8em" color="primary" unelevated no-caps />
          </template>
        </div>
      </q-item-section>
    </q-item>

  </q-list>
</template>

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
