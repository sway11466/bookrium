<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-section side>
          <q-btn square icon="star" @click="test"/>
        </q-item-section>
      </q-item>
    </q-list>
    <dive>
      <a target="_blank" href="https://icons8.com/icon/qpuOQzhOVZ0a/amazon-kindle">Amazon Kindle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </dive>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBooksStore } from 'src/stores/Books';
import { useConnectsStore } from 'src/stores/Connects';
import { ConnectApi } from '../stores/ConnectTypes';

// Suppress ts lint message.
export interface Window {
  connectApi: ConnectApi
}
export declare var window: Window


function useTest() {
  async function test() {
    const connects = useConnectsStore();
    const books = useBooksStore();
    // await connects.kindleTest('userid', 'password');
    // const collects = await connects.collectKindleBooks();
    // books.addKindleBooks(collects);
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
