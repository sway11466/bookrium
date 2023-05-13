<template>
  <q-item @click="showEditDialog(kindle.id)" clickable v-ripple>
    <q-item-section avatar>
        <q-img src="kindle-48x48.svg" width="48px" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
          Amazon Kindle
      </q-item-label>
      <q-item-label caption>{{ kindle.email }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-badge label="100" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useConnectsStore } from 'src/stores/Connects';
import { KindleConnect } from 'src/stores/ConnectTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useConnectsStore();

// --------------------------------
//  prop
// --------------------------------
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

// --------------------------------
//  emit
// --------------------------------
const emit = defineEmits([
  'showEditDialog',  // show edit dialog via parent component(ContentsPage).
]);

// --------------------------------
//  local var
// --------------------------------
const kindle: Ref<KindleConnect> = ref(store.get(props.id) as KindleConnect);

// --------------------------------
//  item actions
// --------------------------------
function showEditDialog(id: string) {
  emit('showEditDialog', id, 'kindle');
}
</script>
