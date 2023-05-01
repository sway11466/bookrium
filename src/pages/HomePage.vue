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
// --------------------------------
//  init ApiManager
// --------------------------------
import { useApiManager } from 'src/stores/ApiManager';
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';

export interface Window {
  localStorageApi: LocalStorageApi
  configApi: ConfigApi
  connectApi: ConnectApi
};
export declare var window: Window;

const apiManager = useApiManager();
apiManager.bindLocalStorageApi(window.localStorageApi);
apiManager.bindConfigApi(window.configApi);
apiManager.bindConnectApi(window.connectApi);

// --------------------------------
//  init SettingStore
// --------------------------------
import { useSettingsStore } from 'src/stores/Settings';
const settings = useSettingsStore();
settings.init();


async function test() {
  console.log('test');
  // const connects = useConnectsStore();
  // const books = useBooksStore();
  // await connects.kindleTest('userid', 'password');
  // const collects = await connects.collectKindleBooks();
  // books.addKindleBooks(collects);
}
</script>
