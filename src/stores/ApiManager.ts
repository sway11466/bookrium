import { defineStore } from 'pinia';
import { LocalStorageApi } from 'app/src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';
import { ConnectApi } from 'app/src-electron/modules/connects/connect-api';

export const useApiManager = defineStore('ApiManager', {
  state: () => ({
    localStorageApi: {} as LocalStorageApi,
    configApi: {} as ConfigApi,
    connectApi: {} as ConnectApi,
  }),

  getters: {
  },

  actions: {
    bindLocalStorageApi(api: LocalStorageApi): void {
      this.localStorageApi = api;
    },

    bindConfigApi(api: ConfigApi): void {
      this.configApi = api;
    },

    bindConnectApi(api: ConnectApi): void {
      this.connectApi = api;
    },
  }
});
