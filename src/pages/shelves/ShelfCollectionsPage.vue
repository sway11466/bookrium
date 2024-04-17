<template>
  <q-page padding>
    <template v-if="shelves.list.length > 0">
      <ShelfCollections />
    </template>

    <template v-if="shelves.list.length === 0">
      <div class="q-pa-lg text-h5">Shelf is not registered.</div>
      <div class="q-pl-lg">Bookshelf is a function to create a collection of books. The order can be rearranged freely within the collection.</div>
      <div class="q-pa-lg">
        <q-btn @click="add" padding="xs lg" no-caps>
          <q-avatar square>
            <q-img src="add-folder-cuteui-64x64.png" />
          </q-avatar>
          <span class="q-px-lg">Add Shelf</span>
        </q-btn>
      </div>
    </template>

    <template v-if="shelves.list.length > 0">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="add" round padding="sm">
          <q-avatar square>
            <q-img src="add-folder-cuteui-64x64.png" no-spinner />
          </q-avatar>
        </q-btn>
      </q-page-sticky>
    </template> 
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ShelfCollections from 'src/components/shelves/ShelfCollections.vue';
import { useShelvesStore } from 'src/stores/Shelves';

const shelves = useShelvesStore();
shelves.init();

const router = useRouter();
function add() {
  router.push({ path: '/shelves/new' });
}
</script>
