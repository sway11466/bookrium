import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useApiManager } from 'src/stores/ApiManager';
import { useSettingsStore } from 'src/stores/Settings';
import { DisplayConnect, Connect, ConnectType, KindleConnect } from 'src/stores/ConnectTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.connector';
const apiManager = useApiManager();
const settings = useSettingsStore();

export const useConnectsStore = defineStore('connects', {
  
  state: (): Connect => ({}),

  getters: {
  },

  actions: {
    // Todo: move getters
    displays() :DisplayConnect[] {
      const all : DisplayConnect[] = [];
      for (const [id, connect] of Object.entries(this)) {
        if (!connect.hasOwnProperty('type')) { continue; }
        if (connect.type == 'kindle') {
          const kindle = connect as KindleConnect;
          all.push({
            id: id,
            type: 'kindle',
            description: kindle.email,
            lastConnectAt: null,
            kindleConnect: kindle,
            LocalStrageConnect: null
          });
        }
      };
      return all
    },

    // --------------------------------
    //  comoon functions
    // --------------------------------
    async init(): Promise<void> {
      await this.loadAllConnects();
      // this.fillSample(); // for debug
    },

    async loadAllConnects(): Promise<boolean> {
      if (!apiManager.configApi.hasConfig(settings.settingPath)) { return false; }
      const connects = await apiManager.configApi.loadConfig(settings.settingPath, CONFIG_CONNECTOR_KEY) as Connect;
      for (const [id, connect] of Object.entries(connects)) {
        this[id] = connect;
      }
      return true;
    },

    // --------------------------------
    //  kindle functions
    // --------------------------------
    newKindleConnect(): KindleConnect {
      return {
        id: uuid(),
        type: 'kindle' as ConnectType,
        email: '',
        password: '',
      }
    },

    cloneKindleConnect(connect: KindleConnect): KindleConnect {
      return {
        id: structuredClone(connect.id),
        type: structuredClone(connect.type),
        email: structuredClone(connect.email),
        password: structuredClone(connect.password),
      }
    },

    saveKindleConnect(connect: KindleConnect) {
      const key = CONFIG_CONNECTOR_KEY + "." + connect.id;
      const value = this.cloneKindleConnect(connect);
      apiManager.configApi.saveConfig(settings.settingPath, key, value);
      // this[connect.id] = connect; //Todo: Reactive not work
    },

    async testKindleSetting(connect: KindleConnect): Promise<boolean> {
      return await apiManager.connectApi.testKindle(connect.email, connect.password);
    },

    async collectKindleBooks(connect: KindleConnect) {
      const books = await apiManager.connectApi.collectKindle(connect.email, connect.password);
      return books;
    },

    async deleteKindleSetting(id: string) {
      // Todo: show confirm dialog
      const key = CONFIG_CONNECTOR_KEY + "." + id;
      await apiManager.configApi.deleteConfig(settings.settingPath, key);
      delete this[id];
      // Todo: delete all books on delete connection
    },
  }
});
