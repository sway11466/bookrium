<template>
  <q-btn label="sort" icon="mdi-sort" square dense no-caps :text-color="sort === 'none' ? 'white' : 'secondary'">
    <q-menu>
      <q-list>
        
        <q-item tag="label">
          <q-item-section side top class="q-pa-xs">
            <q-radio v-model="sort" val="none" size="xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label>none</q-item-label>
          </q-item-section>
          <q-item-section side top class="q-pa-xs">
            <q-icon name="mdi-cancel" />
          </q-item-section>
        </q-item>

        <q-separator />

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
</template>

<style scoped>
</style>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const sort = ref(route.params.sort ?? 'none') as Ref<string>;
watch(sort, (newSort, oldSort) => {
  const query = Object.assign({}, route.query, { sort: newSort });
  router.push({query}); 
});
</script>
