<template>
  <q-page>
    <q-list>
      <q-expansion-item expand-separator icon="mdi-database-outline" label="Strage Settings">
        <q-list class="q-ml-md">
          <q-item>
            <q-item-section>
              <q-item-label>Data Folder Path</q-item-label>
              <q-item-label>
                <q-input outlined v-model="settings.dataFolderPath"/>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn square icon="mdi-folder-settings" @click="selectDataFolderPath"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-separator />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSettingsStore } from 'src/stores/Settings.js';

function useTest() {
  async function test() {
    // await window.native.saveConfig({a: 'yes', b: 'no'});
    // const message = await window.native.loadConfig();
    // const hoge = await window.native.selectFolder();
    // console.log(hoge)

  }
  return { test };
}

function functions() {
  async function selectDataFolderPath () {
    const { canceled, filePaths } = await window.native.selectFolder();
    if (canceled) { return }
    const settings = useSettingsStore();
    settings.dataFolderPath = filePaths[0]
  }
  return { selectDataFolderPath }
}

export default defineComponent({
  name: 'ConnectsPage',
  components: { },
  setup () {
    const settings = useSettingsStore();
    return { ...functions(), settings };
  }
});
</script>
