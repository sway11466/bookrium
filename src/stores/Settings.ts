import * as path from 'path';
import { defineStore } from 'pinia';
import { LocalStorageApi } from 'src-electron/modules/lsTypes';
import { Setting } from './SettingTypes';


export const useSettingsStore = defineStore('settings', {
  state: () => ({
    localStorageApi: {} as LocalStorageApi,
    dataFolderPath: '' as string,
  }),

  getters: {
    async defaultSetting() :Promise<Setting> {
      const dataFolder = await this.localStorageApi.getUserAppDataFolder();
      return {
        dataFolderPath: dataFolder,
        cachFolderPath: path.join(dataFolder, 'cache'),
      }
    }
  },

  actions: {
    // --------------------------------
    //  bind apis
    // --------------------------------
    bind(localStorageApi:LocalStorageApi) {
      this.localStorageApi = localStorageApi;
    },

    // --------------------------------
    //  api bredge
    // --------------------------------
    async selectFolder() :Promise<Electron.OpenDialogReturnValue> {
      return await this.localStorageApi.selectFolder();
    }
  }
});
