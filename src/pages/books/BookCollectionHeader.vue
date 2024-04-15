<template>
  <q-toolbar>
    <div class="q-mr-md no-wrap">
      <q-btn dense flat round icon="menu" @click="emit('toggleLeftDrawer')" />
    </div>

    <q-separator vertical inset color="white" />
    <q-toolbar-title class="q-ml-md no-wrap">
      books
    </q-toolbar-title>

    <q-separator vertical inset color="white" />
    <div class="q-ml-md no-wrap">
      <q-input v-model="search" placeholder="Search" class="bg-white col" dense outlined square />
    </div>
    <div class="q-mr-md no-wrap">
      <q-btn class="q-ml-sm" icon="search" square dense />
    </div>

    <q-separator vertical inset color="white" />
    <div class="q-mx-md no-wrap">
      <q-btn label="filter" icon="filter_alt" square dense no-caps />
    </div>

    <q-separator vertical inset color="white" />
    <div class="q-mx-md no-wrap">
      <q-btn label="sort" icon="mdi-sort" square dense no-caps text-color="secondary">
        <q-menu>
          <q-list>
            <q-item tag="label">
              <q-item-section side top class="q-pa-xs">
                <q-radio v-model="sort" val="title_ascending" size="xs" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Title (Accending)</q-item-label>
              </q-item-section>
              <q-item-section side top class="q-pa-xs">
                <q-icon name="mdi-sort-alphabetical-ascending" />
              </q-item-section>
            </q-item>  
            <q-item tag="label">
              <q-item-section side top class="q-pa-xs">
                <q-radio v-model="sort" val="title_descending" size="xs" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Title (Descending)</q-item-label>
              </q-item-section>
              <q-item-section side top class="q-pa-xs">
                <q-icon name="mdi-sort-alphabetical-descending" />
              </q-item-section>
            </q-item>  
            <q-item tag="label">
              <q-item-section side top class="q-pa-xs">
                <q-radio v-model="sort" val="author_ascending" size="xs" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Author (Accending)</q-item-label>
              </q-item-section>
              <q-item-section side top class="q-pa-xs">
                <q-icon name="mdi-sort-alphabetical-ascending" />
              </q-item-section>
            </q-item>  
            <q-item tag="label">
              <q-item-section side top class="q-pa-xs">
                <q-radio v-model="sort" val="author_descending" size="xs" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Author (Descending)</q-item-label>
              </q-item-section>
              <q-item-section side top class="q-pa-xs">
                <q-icon name="mdi-sort-alphabetical-descending" />
              </q-item-section>
            </q-item>  
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <q-separator vertical inset color="white" />
    <div class="q-ml-md no-wrap">
      <q-btn-group>
        <q-btn label="grid" icon="grid_view" square dense no-caps />
        <q-btn label="list" icon="list" square dense no-caps />
      </q-btn-group>
    </div>
  </q-toolbar>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const emit = defineEmits(['toggleLeftDrawer']);
const route = useRoute();
const router = useRouter();
const search = ref('');
const sort = ref(route.params.sort ?? '') as Ref<string>;
watch(sort, (newSort, oldSort) => {
  const query = Object.assign({}, route.query, { sort: newSort });
  router.push({query}); 
});
</script>
