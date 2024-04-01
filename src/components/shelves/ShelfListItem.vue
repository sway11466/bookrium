<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col">{{props.shelf.name}}</div>
        <div class="col">
          <q-btn @click="showEditDialog" flat round size="xs" class="float-right">
            <q-img src="edit-cuteui-64x64.png" no-spinner />
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-card {
  width: 20em;
  height: 10em;
}
</style>

<script setup lang="ts">
import { useShelvesStore } from 'src/stores/Shelves';
import { Shelf } from 'src/stores/ShelvesTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useShelvesStore();

// --------------------------------
//  prop (parameter value)
// --------------------------------
const props = defineProps({
  shelf: {
    type: Object as () => Shelf,
    required: true,
  },
});

// --------------------------------
//  emit (parameter function)
// --------------------------------
const emit = defineEmits([
  'edit', // show dialog via parent component.
]);

async function showEditDialog() {
  emit('edit', props.shelf);
}
</script>
