<template>
  <q-page class="col">
    <q-list>
      <template v-for="connect in connects.all" :key="connect.id">
        <template v-if="connect.type == 'amazon'">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="A" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Amazon</q-item-label>
              <q-item-label caption>{{ connect.userid }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-badge label="100" />
            </q-item-section>
          </q-item>
        </template>
        <template v-if="connect.type == 'localfile'">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="F" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Local File</q-item-label>
              <q-item-label caption>{{ connect.path }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-badge label="100" />
            </q-item-section>
          </q-item>
        </template>
        <q-separator />
      </template>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useConnectsStore } from 'src/stores/Connects.js';

export default defineComponent({
  name: 'ConnectsPage',
  components: { },
  setup () {
    const connects = useConnectsStore();
    connects.fillSample()
    return { connects };
  }
});
</script>
