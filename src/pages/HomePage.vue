<template>
  <q-page>
    <q-list>
      <q-item-label class="q-pb-none" header>Books</q-item-label>
      <q-item>
        <q-virtual-scroll :items="heavyList" virtual-scroll-horizontal v-slot="{ item, index }">
          <q-card :key="index" :class="item.class">
            #{{ index }} - {{ item.label }}
          </q-card>
        </q-virtual-scroll>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
const maxSize = 10;
const heavyList = [] as object[];
for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1),
    class: i % 2 === 0 ? 'q-ma-md q-py-lg self-center bg-grey-2 text-black' : 'q-ma-md q-py-lg bg-black text-white'
  })
}
</script>

<script lang="ts">
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
