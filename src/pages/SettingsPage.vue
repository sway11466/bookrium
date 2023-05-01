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
                <q-input readonly v-model="setting.settingPath" outlined dense>
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
                <q-input readonly v-model="setting.storage.dataFolderPath" outlined dense>
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
import { Setting } from 'src/stores/SettingTypes';

// --------------------------------
//  store init
// --------------------------------
const settings = useSettingsStore();

// --------------------------------
//  local var
// --------------------------------
// TODO: use default. needs clone.
// const bookriumSetting :Ref<BookriumSetting> = ref(await settings.defaultSettings);
const setting :Ref<Setting> = ref({
  settingPath: '',
  storage: {
    dataFolderPath: '',
    bookFolderPath: '',
    cacheFolderPath: '',
    artworkFolderPath: '',
  }
});

// --------------------------------
//  lifecycle events
// --------------------------------
onMounted(async () => {
  await settings.init();
  setting.value.settingPath = settings.settingPath;
  setting.value.storage = settings.storage;
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
