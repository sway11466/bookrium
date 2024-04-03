<template>
  <q-card @click="show" flat bordered>
    <q-img src="bookshelf-640x427.jpg">
      <div class="absolute-bottom row justify-between">
        <div class="col-9">{{props.shelf.name}}</div>
        <div class="col-3"><q-chip square dense color="primary" text-color="white" :ripple="false">9999+</q-chip></div><!-- todo: book count -->
      </div>
    </q-img>
    <q-fab @click.stop direction="down" vertical-actions-align="right"
           color="primary" icon="menu" padding="xs" class="absolute" style="top: 1em; right: 1em;">
      <q-fab-action @click="edit" icon="mdi-file-document-edit" color="primary" label="edit" />
      <q-fab-action @click="edit" icon="delete" color="red" label="delete" />
    </q-fab>
  </q-card>
</template>

<style scoped>
.q-card {
  width: 20em;
}
.q-img {
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Shelf } from 'src/stores/ShelvesTypes';

const props = defineProps({
  shelf: {
    type: Object as () => Shelf,
    required: true,
  },
});

const router = useRouter();

function show() {
  router.push({ path: `/shelves/${props.shelf.id}` });
}

function edit() {
  router.push({ path: `/shelves/${props.shelf.id}/edit` });
}
</script>
