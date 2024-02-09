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
      apiManager.configApi.saveConfig(this.settingPath, CONFIG_SETTING_KEY, this.deproxy());
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
          shelvesFolderPath: appDirPath + '\\Bookrium\\shelves',
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
      this.storage = {
        dataFolderPath: items.storage.dataFolderPath,
        artworkFolderPath: items.storage.dataFolderPath + '\\Bookrium\\artworks',
        bookFolderPath: items.storage.dataFolderPath + '\\Bookrium\\books',
        cacheFolderPath: items.storage.dataFolderPath + '\\Bookrium\\cache',
        shelvesFolderPath: items.storage.dataFolderPath + '\\Bookrium\\shelves',
        labelFolderPath: items.storage.dataFolderPath + '\\Bookrium\\labels',
    };
      this.save();
      return true;
    },

    deproxy(): SettingStore {
      return {
        settingPath: this.settingPath,
        storage: {
          dataFolderPath: this.storage.dataFolderPath,
          artworkFolderPath: this.storage.artworkFolderPath,
          bookFolderPath: this.storage.bookFolderPath,
          cacheFolderPath: this.storage.cacheFolderPath,
          shelvesFolderPath: this.storage.shelvesFolderPath,
          labelFolderPath: this.storage.labelFolderPath,
        },
        showapp: {
          kindle: this.showapp.kindle,
          pdf: this.showapp.pdf,
        },
        platform: this.platform,
        version: this.version,
      }
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
