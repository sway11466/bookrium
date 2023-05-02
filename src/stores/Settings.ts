import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { PlatformType, Setting, Storage } from 'src/stores/SettingTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_SETTING_KEY = CONFIG_ROOT_KEY + '.setting';

export const useSettingsStore = defineStore('settings', {
  state: (): Setting => ({
    settingPath: '',
    storage: {} as Storage,
    platform: 'win32',
  }),

  getters: {
    async defaultSettings(): Promise<Setting> {
      const apiManager = useApiManager();
      const appDirPath = await apiManager.localStorageApi.getUserAppDataFolder();
      return {
        settingPath: appDirPath + '\\Bookrium\\bookrium.json',
        storage: {
          dataFolderPath: appDirPath + '\\Bookrium',
          bookFolderPath: appDirPath + '\\Bookrium\\book',
          cacheFolderPath: appDirPath + '\\Bookrium\\cache',
          artworkFolderPath: appDirPath + '\\Bookrium\\artwork',
        },
        platform: await apiManager.settingApi.getPlatform() as PlatformType
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
      if (await apiManager.configApi.hasConfig(defaultSetting.settingPath)) {
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
      const load = await apiManager.configApi.loadConfig(defaultSetting.settingPath, CONFIG_SETTING_KEY) as Setting;
      this.settingPath = load.settingPath;
      this.storage = load.storage;
      this.platform = await apiManager.settingApi.getPlatform() as PlatformType;
    },

    async save() {
      const apiManager = useApiManager();
      apiManager.configApi.saveConfig(
        this.settingPath,
        CONFIG_SETTING_KEY,
        {
          settingPath: this.settingPath,
          storage: {
            dataFolderPath: this.storage.dataFolderPath,
            bookFolderPath: this.storage.bookFolderPath,
            cacheFolderPath: this.storage.cacheFolderPath,
            artworkFolderPath: this.storage.artworkFolderPath,
          }
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
