import { defineStore } from 'pinia';
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';
import { SettingApi } from 'src-electron/modules/settings/setting-api';
import { useSettingsStore } from 'src/stores/Settings';

const settings = useSettingsStore();

export const useApiManager = defineStore('ApiManager', {
  state: () => ({
    localStorageApi: {} as LocalStorageApi,
    configApi: {} as ConfigApi,
    connectApi: {} as ConnectApi,
    settingApi: {} as SettingApi,
    path: {
      separator,
      join,
    },
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

    bindSettingApi(api: SettingApi): void {
      this.settingApi = api;
    },
  }
});

const separator = (): string => {
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
