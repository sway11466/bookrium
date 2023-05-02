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

<script setup lang="ts">
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';
import { SettingApi } from 'src-electron/modules/settings/setting-api';

// --------------------------------
//  supress window function error
// --------------------------------
export declare var window: Window;
export interface Window {
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
//  SettingStore
// --------------------------------
import { useSettingsStore } from 'src/stores/Settings';
const settings = useSettingsStore();

// --------------------------------
//  ConnectorStore
// --------------------------------
import { useConnectsStore } from 'src/stores/Connects';
const connects = useConnectsStore();

// --------------------------------
//  init 
// --------------------------------
const init = async () => {
  apiManager.bindLocalStorageApi(window.localStorageApi);
  apiManager.bindConfigApi(window.configApi);
  apiManager.bindConnectApi(window.connectApi);
  apiManager.bindSettingApi(window.settingApi);
  await settings.init();
  await connects.init();
};
init();

async function test() {
  console.log('test');
  // const connects = useConnectsStore();
  // const books = useBooksStore();
  // await connects.kindleTest('userid', 'password');
  // const collects = await connects.collectKindleBooks();
  // books.addKindleBooks(collects);
}
</script>
