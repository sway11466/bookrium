<template>
  <template />
</template>

<script setup lang="ts">
// --------------------------------
//  supress window function error
// --------------------------------
export declare var window: Window;
export interface Window {
  shellApi: ShellApi;
  localStorageApi: LocalStorageApi;
  configApi: ConfigApi;
  connectApi: ConnectApi;
  settingApi: SettingApi;
}

// --------------------------------
//  Init ApiManager
// --------------------------------
import { useApiManager } from 'src/stores/ApiManager'
import { ShellApi } from 'src-electron/modules/shell-api';
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';
import { SettingApi } from 'src-electron/modules/settings/setting-api';

const apiManager = useApiManager();
if (!apiManager.initialized) {
  apiManager.bindShellApi(window.shellApi);
  apiManager.bindLocalStorageApi(window.localStorageApi);
  apiManager.bindConfigApi(window.configApi);
  apiManager.bindConnectApi(window.connectApi);
  apiManager.bindSettingApi(window.settingApi);
}

// --------------------------------
//  Books Store
// --------------------------------
import { useBooksStore } from 'src/stores/Books';
const books = useBooksStore();

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
  await settings.init();
  await connects.init();
  await books.init();
};
init();

</script>
