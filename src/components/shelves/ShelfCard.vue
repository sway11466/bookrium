<template>
  <q-card flat bordered>
    <q-img src="bookshelf-640x427.jpg"  @click="show">
      <div class="absolute-bottom row justify-between">
        <div class="col-9">{{props.shelf.name}}</div>
        <div class="col-3"><q-chip square dense color="primary" text-color="white" :ripple="false">9999+</q-chip></div><!-- todo: book count -->
      </div>
    </q-img>
    <q-card-actions align="right">
      <q-btn @click="edit" no-caps flat>
        <q-avatar size="md" square><img src="edit-prop-cuteui-64x64.png" /></q-avatar>
        <q-item-label class="q-ml-xs">edit</q-item-label>
      </q-btn>
    </q-card-actions>
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
