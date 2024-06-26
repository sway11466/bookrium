<template>
  <q-card class="q-gutter-y-md q-pa-md" flat>

    <q-card-section class="q-px-none">
      <div>label name</div>
      <q-input dense v-model="label.name" autofocus />
    </q-card-section>

    <q-card-section class="q-px-none">
      <div>color</div>
      <q-btn padding="xs" round flat>
        <q-avatar>
          <q-img src="txet-color-40x40.png" no-spinner />
        </q-avatar>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="label.fore_color" default-view="palette" />
        </q-popup-proxy>        
      </q-btn>
      <q-btn padding="xs" round flat>
        <q-avatar>
          <q-img src="back-color-40x40.png" no-spinner />
        </q-avatar>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="label.back_color" default-view="palette" />
        </q-popup-proxy>        
      </q-btn>
      <q-chip :label="label.name" :style="{ color: label.fore_color, backgroundColor: label.back_color }" style="min-width: 128px;" />
    </q-card-section>

    <q-card-section class="q-px-none">
      <div>parent label</div>
      <q-select v-model="parent" :options="parents" option-label="name"
                @filter="filterParent" @update:model-value="selectParent"
                use-input behavior="menu">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
    
    <template v-if="props.mode == 'add'">
      <q-card-actions class="q-px-none qu-py-lg" vertical>
          <q-btn label="Add Label" @click="add" icon="mdi-plus" padding="xs lg" color="primary" unelevated no-caps />
      </q-card-actions>
    </template>

    <template v-if="props.mode == 'edit'">
      <q-card-actions class="q-px-none qu-py-lg" vertical>
          <q-btn label="Edit Done" @click="update" icon="mdi-check" padding="xs lg" color="primary" unelevated no-caps />
      </q-card-actions>
      <q-separator />
      <q-card-actions class="q-px-none qu-py-lg" vertical>
          <q-btn label="Delet Label" @click="del" icon="mdi-delete" padding="xs lg" color="red" unelevated no-caps />
      </q-card-actions>
    </template>
</q-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useLabelsStore } from 'src/stores/Labels';
import { Label } from 'src/stores/LabelTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useLabelsStore();

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
    required: true,
  }
});

// --------------------------------
//  parent label selector
// --------------------------------
const parent = ref(store.newLabel());
const parents = ref(store.list);

function filterParent(val: string, update: (param: () => void) => void) {
  const list = store.list.filter(v => label.value.id != v.id);
  if (val === '') {
    update(() => parents.value = list);
  } else {
    update(() => {
      const name = val.toLowerCase()
      parents.value = list.filter(v => v.name.toLowerCase().indexOf(name) > -1)
    })
  }
};

function selectParent(val: Label) {
  label.value.parent_id = val.id;
}

// --------------------------------
//  Label Editor
// --------------------------------
const label: Ref<Label> = ref(props.mode === 'add' ? store.newLabel(): store.get(props.id));

  async function add() {
  await store.add(label.value);
};

async function update() {
  await store.update(label.value);
};

async function del() {
  // Todo: confirm Dialog
  await store.del(label.value.id);
};
</script>
