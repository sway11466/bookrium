<template>
  <q-page>
    <q-list>
      <q-item-label class="q-pb-none" header>Books</q-item-label>
      <q-item>
        <BookSlide />
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
// 
</script>

<script lang="ts">
import BookSlide from 'src/components/home/BookSlide.vue';
import { ShellApi } from 'src-electron/modules/shell-api';
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';
import { SettingApi } from 'src-electron/modules/settings/setting-api';

// --------------------------------
//  supress window function error
// --------------------------------
export declare var window: Window;
export interface Window {
  shellApi: ShellApi
  localStorageApi: LocalStorageApi
  configApi: ConfigApi
  connectApi: ConnectApi
  settingApi: SettingApi
};

// --------------------------------
//  ApiManager
// --------------------------------
import { useApiManager } from 'src/stores/ApiManager';
const apiManager = useApiManager();

// --------------------------------
//  Books Store
// --------------------------------
import { useBooksStore } from 'src/stores/Books';
const books = useBooksStore();

// --------------------------------
//  Labels Store
// --------------------------------
import { useLabelsStore } from 'src/stores/Labels';
const labels = useLabelsStore();

// --------------------------------
//  Connectors Store
// --------------------------------
import { useConnectsStore } from 'src/stores/Connects';
const connects = useConnectsStore();

// --------------------------------
//  Setting Store
// --------------------------------
import { useSettingsStore } from 'src/stores/Settings';
const settings = useSettingsStore();

// --------------------------------
//  init 
// --------------------------------
const init = async () => {
  apiManager.bindShellApi(window.shellApi);
  apiManager.bindLocalStorageApi(window.localStorageApi);
  apiManager.bindConfigApi(window.configApi);
  apiManager.bindConnectApi(window.connectApi);
  apiManager.bindSettingApi(window.settingApi);
  await settings.init();
  await connects.init();
  await books.init();
  await labels.init();
};
init();
</script>
