<template>
  <q-page>
    <q-list>
      <q-expansion-item expand-separator icon="mdi-database-outline" label="Strage Settings">
        <q-list class="q-ml-md">
          <q-item>
            <q-item-section>
              <q-item-label>Setting File Path</q-item-label>
              <q-item-label caption>It is now for display only and cannot be changed.</q-item-label>
              <q-item-label>
                <q-input readonly v-model="bookriumSetting.storageSetting.settingPath" outlined dense>
                  <template v-slot:append>
                    <q-btn icon="mdi-folder-settings" @click="selectDataFolderPath" round unelevated />
                  </template>
                </q-input>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Data Folder Path</q-item-label>
              <q-item-label caption>It is now for display only and cannot be changed.</q-item-label>
              <q-item-label>
                <q-input readonly v-model="bookriumSetting.storageSetting.dataFolderPath" outlined dense>
                  <template v-slot:append>
                    <q-btn icon="mdi-folder-settings" @click="selectDataFolderPath" round unelevated />
                  </template>
                </q-input>
              </q-item-label>
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
import { SettingApi } from 'src-electron/modules/setting/setting-api';
import { LocalStorageApi } from 'src-electron/modules/lsTypes';
import { BookriumSetting } from 'src/stores/SettingTypes';

// --------------------------------
//  suppress ts lint message.
// --------------------------------
export interface Window {
  settingApi: SettingApi
  localStorageApi: LocalStorageApi
};
export declare var window: Window;

// --------------------------------
//  store init
// --------------------------------
const settings = useSettingsStore();
settings.bind(window.localStorageApi, window.settingApi);

// --------------------------------
//  local var
// --------------------------------
// const bookriumSetting :Ref<BookriumSetting> = ref(await settings.defaultSettings);
const bookriumSetting :Ref<BookriumSetting> = ref({
  storageSetting: {
    dataFolderPath: '',
    cacheFolderPath: '',
    artworkFolderPath: '',
    settingPath: '',
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

// --------------------------------
//  
// --------------------------------
async function selectDataFolderPath () {
  console.log('not implements.');
  // const { canceled, filePaths } = await settings.selectFolder();
  // if (canceled) { return }
  // bookriumSetting.value.storageSetting.dataFolderPath = filePaths[0];
}
</script>
