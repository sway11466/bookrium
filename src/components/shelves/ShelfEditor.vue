<template>
  <q-card class="q-gutter-y-md q-pa-md" flat>

    <q-card-section class="q-px-none">
      <div>name</div>
      <div class="q-ml-sm"><q-input filled dense v-model="shelf.name" autofocus /></div>
    </q-card-section>

    <q-card-section class="q-px-none">
      <div>description</div>
      <div class="q-ml-sm"><q-input filled dense v-model="shelf.description" type="textarea" /></div>
    </q-card-section>

    <q-card-section class="q-px-none">
      <div>image</div>
      <div class="q-ml-sm"><q-img src="bookshelf-640x427.jpg" /></div>
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
          <q-btn label="Delet Shelf" @click="del" icon="mdi-delete" padding="xs lg" color="red" outline no-caps />
      </q-card-actions>
    </template>
  </q-card>
</template>


<style scoped>
.q-img {
  max-width: 20em;
}
</style>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useShelvesStore } from 'src/stores/Shelves';
import { Shelf } from 'src/stores/ShelvesTypes';

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

const store = useShelvesStore();
const shelf: Ref<Shelf> = ref(props.mode === 'add' ? store.newShelf(): store.clone(store.get(props.id)));

async function add() {
  await store.add(shelf.value);
};

async function update() {
  await store.update(shelf.value);
};

async function del() {
  // Todo: confirm Dialog
  await store.del(shelf.value.id);
};
</script>
