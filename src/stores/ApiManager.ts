import { defineStore } from 'pinia';
import { ShellApi } from 'src-electron/modules/shell-api';
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';
import { SettingApi } from 'src-electron/modules/settings/setting-api';
import { useSettingsStore } from 'src/stores/Settings';
import { ApiManagerStore } from './ApiManagerTypes';

export const useApiManager = defineStore('ApiManager', {
  state: (): ApiManagerStore => ({
    shellApi: null,
    localStorageApi: null,
    configApi: null,
    connectApi: null,
    settingApi: null,
    path: {
      separator,
      join,
    },
  }),

  getters: {
  },

  actions: {
    bindShellApi(api: ShellApi): void {
      this.shellApi = api;
    },

    bindLocalStorageApi(api: LocalStorageApi): void {
      this.localStorageApi = api;
    },

    bindConfigApi(api: ConfigApi): void {
      this.configApi = api;
    },

    bindConnectApi(api: ConnectApi): void {
      this.connectApi = api;
    },

    bindSettingApi(api: SettingApi): void {
      this.settingApi = api;
    },
  }
});

const separator = (): string => {
  const settings = useSettingsStore();
  switch (settings.platform) {
    case 'win32':
      return '\\';
    default:
      return '/';
  }
}

const join = (base: string, ...paths: string[]) :string => {
  let path = base;
  const sep = separator();
  paths.forEach(p => {
    path = path + sep + p;
  });
  return path;
};
