<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-section side>
          <q-btn square icon="star" @click="test"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useConnectsStore } from 'src/stores/Connects.js';
import { ConnectApi } from '../stores/ConnectsTypes';

// Suppress ts lint message.
export interface Window {
  connectApi: ConnectApi
}
export declare var window: Window


function useTest() {
  async function test() {
    const connects = useConnectsStore();
    await connects.kindleTest('userid', 'password');
  }
  return { test };
}

export default defineComponent({
  name: 'ConnectsPage',
  components: { },
  setup () {
    const books = useConnectsStore();
    books.bind(window.connectApi);
    return { ...useTest(), books };
  }
});
</script>
