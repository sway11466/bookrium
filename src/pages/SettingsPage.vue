<template>
  <q-page>
    <q-list>
      <q-expansion-item expand-separator icon="mdi-database-outline" label="Strage Settings">
        <q-list class="q-ml-md">
          <q-item>
            <q-item-section>
              <q-item-label>Data Folder Path</q-item-label>
              <q-item-label>
                <q-input outlined v-model="bookriumSetting.storageSetting.dataFolderPath"/>
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
import { ref, Ref, onMounted } from 'vue';
import { useSettingsStore } from 'src/stores/Settings.js';
import { ConfigApi } from 'src-electron/modules/config-api';
import { LocalStorageApi } from 'src-electron/modules/lsTypes';
import { BookriumSetting } from 'src/stores/SettingTypes';

// --------------------------------
//  suppress ts lint message.
// --------------------------------
export interface Window {
  configApi: ConfigApi
  localStorageApi: LocalStorageApi
};
export declare var window: Window;

// --------------------------------
//  store init
// --------------------------------
const settings = useSettingsStore();
settings.bind(window.localStorageApi, window.configApi);

// --------------------------------
//  local var
// --------------------------------
// const bookriumSetting :Ref<BookriumSetting> = ref(await settings.defaultSettings);
const bookriumSetting :Ref<BookriumSetting> = ref({
  storageSetting: {
    dataFolderPath: '',
    cacheFolderPath: '',
    artworkFolderPath: '',
    connectorSettingPath: '',
  }
});

// --------------------------------
//  lifecycle events
// --------------------------------
onMounted(() => {
  settings.init();
  bookriumSetting.value.storageSetting = settings.storageSetting;
});

async function selectDataFolderPath () {
  const { canceled, filePaths } = await settings.selectFolder();
  if (canceled) { return }
  bookriumSetting.value.storageSetting.dataFolderPath = filePaths[0];
}
</script>
