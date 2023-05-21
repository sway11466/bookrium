import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { PlatformType, SettingStore, SettingUpdatable, ShowApp, Storage } from 'src/stores/SettingTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_SETTING_KEY = CONFIG_ROOT_KEY + '.setting';

export const useSettingsStore = defineStore('settings', {
  state: (): SettingStore => ({
    settingPath: '',
    storage: {} as Storage,
    showapp: {} as ShowApp,
    platform: 'win32',
    version: 'unknown',
  }),

  getters: {},

  actions: {
    // --------------------------------
    //  initialize store
    // --------------------------------
    async init() {
      const apiManager = useApiManager();
      const defaultSetting = await this.new();
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
      const defaultSetting = await this.new();
      const loaded = await apiManager.configApi.loadConfig(defaultSetting.settingPath, CONFIG_SETTING_KEY) as SettingStore;
      // Todo: setting validation
      Object.assign(this, defaultSetting, loaded);
    },

    async save() {
      const apiManager = useApiManager();
      apiManager.configApi.saveConfig(this.settingPath, CONFIG_SETTING_KEY, deproxy(this));
    },

    async new(): Promise<SettingStore> {
      const apiManager = useApiManager();
      const appDirPath = await apiManager.localStorageApi.getUserAppDataFolder();
      return {
        settingPath: appDirPath + '\\Bookrium\\bookrium.json',
        storage: {
          dataFolderPath: appDirPath + '\\Bookrium',
          artworkFolderPath: appDirPath + '\\Bookrium\\artworks',
          bookFolderPath: appDirPath + '\\Bookrium\\books',
          cacheFolderPath: appDirPath + '\\Bookrium\\cache',
          labelFolderPath: appDirPath + '\\Bookrium\\labels',
        },
        showapp: {
          kindle: 'builtin',
          pdf: 'builtin',
        },
        platform: await apiManager.settingApi.getPlatform() as PlatformType,
        version: await apiManager.settingApi.getAppVersion() as string,
      }
    },

    update(items: SettingUpdatable): boolean {
      this.showapp.kindle = items.showapp.kindle
      this.showapp.pdf = items.showapp.pdf
      this.settingPath = items.settingPath;
      this.storage.dataFolderPath = items.storage.dataFolderPath;
      this.save();
      return true;
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

const deproxy = (setting: SettingStore): SettingStore => {
  return {
    settingPath: setting.settingPath,
    storage: {
      dataFolderPath: setting.storage.dataFolderPath,
      artworkFolderPath: setting.storage.artworkFolderPath,
      bookFolderPath: setting.storage.bookFolderPath,
      cacheFolderPath: setting.storage.cacheFolderPath,
      labelFolderPath: setting.storage.labelFolderPath,
    },
    showapp: {
      kindle: setting.showapp.kindle,
      pdf: setting.showapp.pdf,
    },
    platform: setting.platform,
    version: setting.version,
  }
}
