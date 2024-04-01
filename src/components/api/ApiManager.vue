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
const apiManager = useApiManager();

import { ShellApi } from 'src-electron/modules/shell-api';
if (!apiManager.shellApi) { apiManager.bindShellApi(window.shellApi); }

import { LocalStorageApi } from 'src-electron/modules/ls-api';
if (!apiManager.localStorageApi) { apiManager.bindLocalStorageApi(window.localStorageApi); }

import { ConfigApi } from 'src-electron/modules/config/config-api';
if (!apiManager.configApi) { apiManager.bindConfigApi(window.configApi); }

import { ConnectApi } from 'src-electron/modules/connects/connect-api';
if (!apiManager.connectApi) { apiManager.bindConnectApi(window.connectApi); }

import { SettingApi } from 'src-electron/modules/settings/setting-api';
if (!apiManager.settingApi) { apiManager.bindSettingApi(window.settingApi); }

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
  await settings.init();
  await connects.init();
  await books.init();
  await labels.init();
};
init();

</script>
