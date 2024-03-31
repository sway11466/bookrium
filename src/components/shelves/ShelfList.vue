<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="(shelf, index) in store.list" :key="index">
      <q-card>
        <q-card-section>
          <div class="row">
          <div class="col">{{shelf.name}}</div>
          <div class="col">
            <q-btn @click="showEditDialog(shelf.id)" icon="edit" flat round size="xs" class="float-right" />
          </div>
        </div>
        </q-card-section>
      </q-card>
    </template>
  </div>
  <template v-if="store.list.length == 0">
    <div class="q-pa-lg text-h5">Shelf is not registered.</div>
    <div class="q-pl-lg">Bookshelf is a function to create a collection of books. The order can be rearranged freely within the collection.</div>
    <div class="q-pa-lg">
      <q-btn @click="showAddDialog" padding="xs lg" no-caps>
        <q-avatar square>
          <q-img src="add-folder-cuteui-64x64.png" />
        </q-avatar>
        <span class="q-px-lg">Add Shelf</span>
      </q-btn>
    </div>
  </template>
</template>

<style scoped>
.q-card {
  width: 20em;
}
</style>

<script setup lang="ts">
import { useShelvesStore } from 'src/stores/Shelves';

// --------------------------------
//  store init
// --------------------------------
const store = useShelvesStore();

// --------------------------------
//  emit
// --------------------------------
const emit = defineEmits([
  'showAddDialog',   // show add dialog via parent component(LabelPage).
  'showEditDialog',  // show edit dialog via parent component(LabelPage).
]);

// --------------------------------
//  item actions
// --------------------------------
function showAddDialog() {
  emit('showAddDialog');
}

function showEditDialog(id: string) {
  emit('showEditDialog', id);
}
</script>
