<template>
  <q-card class="q-gutter-y-md q-pa-md" flat>

    <q-card-section class="q-px-none">
      <div>shelf name</div>
      <q-input dense v-model="shelf.name" autofocus />
    </q-card-section>

    <q-card-section class="q-px-none">
      <div>description</div>
      <q-input dense v-model="shelf.description" autofocus />
    </q-card-section>
    
    <template v-if="props.mode == 'add'">
      <q-card-actions class="q-px-none qu-py-lg" vertical>
          <q-btn label="Add Shelf" @click="add" icon="mdi-plus" padding="xs lg" color="primary" unelevated no-caps />
      </q-card-actions>
    </template>

    <template v-if="props.mode == 'edit'">
      <q-card-actions class="q-px-none qu-py-lg" vertical>
          <q-btn label="Edit Done" @click="update" icon="mdi-check" padding="xs lg" color="primary" unelevated no-caps />
      </q-card-actions>
      <q-separator />
      <q-card-actions class="q-px-none qu-py-lg" vertical>
          <q-btn label="Delet Shelf" @click="del" icon="mdi-delete" padding="xs lg" color="red" unelevated no-caps />
      </q-card-actions>
    </template>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useShelvesStore } from 'src/stores/Shelves';
import { Shelf } from 'src/stores/ShelvesTypes';

// --------------------------------
//  shelf store init
// --------------------------------
const store = useShelvesStore();

// --------------------------------
//  prop
// --------------------------------
const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator(value: string) {
      return ['add', 'edit'].includes(value);
    }
  },
  id: {
    type: String,
    required: false,
    default: ''
  }
});

// --------------------------------
//  fire parent component events
// --------------------------------
const emit = defineEmits([
  'showDialog', // show dialog via parent component.
  'hideDialog', // hide dialog via parent component.
]);

// --------------------------------
//  Label Editor
// --------------------------------
const shelf: Ref<Shelf> = ref(props.mode === 'add' ? store.newShelf(): store.get(props.id));

async function add() {
  await store.add(shelf.value);
  emit('hideDialog');
};

async function update() {
  await store.update(shelf.value);
  emit('hideDialog');
};

async function del() {
  // Todo: confirm Dialog
  await store.del(shelf.value.id);
  emit('hideDialog');
};
</script>
