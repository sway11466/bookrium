import { defineStore } from 'pinia';
import { ConfigApi } from 'src-electron/modules/config-api';
import { LocalStorageApi } from 'src-electron/modules/lsTypes';
import { BookriumSetting, StorageSetting } from './SettingTypes';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    configApi: {} as ConfigApi,
    localStorageApi: {} as LocalStorageApi,
    storageSetting: {} as StorageSetting,
  }),

  getters: {
    async defaultSettings() :Promise<BookriumSetting> {
      const dataFolder = await this.localStorageApi.getUserAppDataFolder();
      return {
        storageSetting: {
          dataFolderPath: dataFolder + '\\Bookrium',
          cacheFolderPath: dataFolder + '\\Bookrium\\cache',
          artworkFolderPath: dataFolder + '\\Bookrium\\artwork',
          settingPath: await this.configApi.getPath(),
          connectorSettingPath: dataFolder + '\\Bookrium\\bookrium-setting-connector.json',
        }
      }
    }
  },

  actions: {
    // --------------------------------
    //  bind apis
    // --------------------------------
    bind(localStorageApi:LocalStorageApi, configApi:ConfigApi) {
      this.localStorageApi = localStorageApi;
      this.configApi = configApi;
    },

    // --------------------------------
    //  initialize store
    // --------------------------------
    async init() {
      if (await this.configApi.hasConfig()) {
        await this.load(); // TODO: error handling
      } else {
        const defaultSetting = await this.defaultSettings;
        Object.assign(this.storageSetting, defaultSetting.storageSetting);
        this.save();
      }
    },

    // --------------------------------
    //  config operation
    // --------------------------------
    async load() {
      const config :BookriumSetting = await this.configApi.loadConfig() as BookriumSetting;
      Object.assign(this.storageSetting, config.storageSetting);
    },

    async save() {
      await this.configApi.saveConfig({
        storageSetting: {
          dataFolderPath: this.storageSetting.dataFolderPath,
          cacheFolderPath: this.storageSetting.cacheFolderPath,
          artworkFolderPath: this.storageSetting.artworkFolderPath,
          settingPath: this.storageSetting.settingPath,
          connectorSettingPath: this.storageSetting.connectorSettingPath,
        }
      });
    },

    // --------------------------------
    //  api bredge
    // --------------------------------
    async selectFolder() :Promise<Electron.OpenDialogReturnValue> {
      return await this.localStorageApi.selectFolder();
    }
  }
});
