import { defineStore } from 'pinia';
import { LocalStorageApi } from 'app/src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';

export const useApiManager = defineStore('ApiManager', {
  state: () => ({
    localStorageApi: {} as LocalStorageApi,
    configApi: {} as ConfigApi,
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
  }
});
