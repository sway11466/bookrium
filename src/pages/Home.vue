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
import { useSettingsStore } from 'src/stores/Settings.js';

function useTest() {
  async function test() {
    const hoge = await window.native.test();
    console.log(hoge);
    // await window.native.saveConfig({a: 'yes', b: 'no'});
    // const message = await window.native.loadConfig();
    // console.log(hoge)

  }
  return { test };
}

export default defineComponent({
  name: 'ConnectsPage',
  components: { },
  setup () {
    const settings = useSettingsStore();
    return { ...useTest(), settings };
  }
});
</script>
