<template>
  <q-page>
    <q-list>
      <q-expansion-item expand-separator icon="mdi-database-outline" label="Strage Settings">
        <q-list class="q-ml-md">
          <q-item>
            <q-item-section>
              <q-item-label>Data Folder Path</q-item-label>
              <q-item-label>
                <q-input outlined v-model="setting.dataFolderPath"/>
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

<script setup lang="ts">
import { ref } from 'vue';
import { useSettingsStore } from 'src/stores/Settings.js';
import { LocalStorageApi } from 'src-electron/modules/lsTypes';

// --------------------------------
//  suppress ts lint message.
// --------------------------------
export interface Window {
  localStorageApi: LocalStorageApi
}
export declare var window: Window

// --------------------------------
//  store init
// --------------------------------
const settings = useSettingsStore();
settings.bind(window.localStorageApi);


// bad name
const setting = ref({ dataFolderPath: '' });

async function selectDataFolderPath () {
  const { canceled, filePaths } = await settings.selectFolder();
  if (canceled) { return }
  setting.value.dataFolderPath = filePaths[0];
}
</script>
