<template>
  <q-page padding>
    <template v-if="labels.list.length > 0">
      <LabelList @edit="edit"/>
    </template>

    <template v-if="labels.list.length === 0">
      <div class="q-pa-lg text-h5">The label is not registered.</div>
      <div class="q-pa-lg">
        <q-btn @click="add" padding="xs lg" no-caps>
          <q-avatar square>
            <q-img src="add-tag-cuteui-64x64.png" />
          </q-avatar>
          <span class="q-px-lg">Add Label</span>
        </q-btn>
      </div>
    </template>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="add" round padding="xs">
        <q-avatar square>
          <q-img src="add-tag-cuteui-64x64.png" no-spinner />
        </q-avatar>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LabelList from 'src/components/labels/LabelList.vue';
import { useLabelsStore } from 'src/stores/Labels';
import { Label } from 'src/stores/LabelTypes';

const labels = useLabelsStore();
labels.init();
const router = useRouter();

function add() {
  router.push({ path: '/labels/new' });
}

function edit(label: Label) {
  router.push({ path: `/labels/${label.id}` });
}
</script>
