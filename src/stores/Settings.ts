import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { BookriumSetting, StorageSetting } from 'src/stores/SettingTypes';

const CONFIG_ROOT_KEY = 'bookrium';

export const useSettingsStore = defineStore('settings', {
  state: (): BookriumSetting => ({
    storageSetting: {} as StorageSetting,
  }),

  getters: {
    async defaultSettings(): Promise<BookriumSetting> {
      const apiManager = useApiManager();
      const appDirPath = await apiManager.localStorageApi.getUserAppDataFolder();
      return {
        storageSetting: {
          settingPath: appDirPath + '\\Bookrium\\bookrium.json',
          dataFolderPath: appDirPath + '\\Bookrium',
          bookFolderPath: appDirPath + '\\Bookrium\\book',
          cacheFolderPath: appDirPath + '\\Bookrium\\cache',
          artworkFolderPath: appDirPath + '\\Bookrium\\artwork',
        }
      }
    }
  },

  actions: {
    // --------------------------------
    //  initialize store
    // --------------------------------
    async init() {
      const apiManager = useApiManager();
      const defaultSetting = await this.defaultSettings;
      if (await apiManager.configApi.hasConfig(defaultSetting.storageSetting.settingPath)) {
        await this.load(); // TODO: error handling
      } else {
        Object.assign(this, defaultSetting);
        await this.save();
      }
    },

    // --------------------------------
    //  config operation
    // --------------------------------
    async load() {
      const apiManager = useApiManager();
      const defaultSetting = await this.defaultSettings;
      const setting = await apiManager.configApi.loadConfig(defaultSetting.storageSetting.settingPath, CONFIG_ROOT_KEY) as BookriumSetting;
      Object.assign(this, setting);
    },

    async save() {
      const apiManager = useApiManager();
      apiManager.configApi.saveConfig(
        this.storageSetting.settingPath,
        CONFIG_ROOT_KEY + '.storageSetting',
        {
            settingPath: this.storageSetting.settingPath,
            dataFolderPath: this.storageSetting.dataFolderPath,
            bookFolderPtha: this.storageSetting.bookFolderPath,
            cacheFolderPath: this.storageSetting.cacheFolderPath,
            artworkFolderPath: this.storageSetting.artworkFolderPath,
        }
      );
    },

    // --------------------------------
    //  api bredge
    // --------------------------------
    async selectFolder() :Promise<Electron.OpenDialogReturnValue> {
      const apiManager = useApiManager();
      return await apiManager.localStorageApi.selectFolder();
    }
  }
});
