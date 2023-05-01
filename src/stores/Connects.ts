import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { useSettingsStore } from 'src/stores/Settings';
import { DisplayConnect, KindleConnect, Connect } from 'src/stores/ConnectTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.connector';

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
      const apiManager = useApiManager();
      const settings = useSettingsStore();
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
    cloneKindleConnect(connect: KindleConnect): KindleConnect {
      return {
        id: structuredClone(connect.id),
        type: structuredClone(connect.type),
        email: structuredClone(connect.email),
        password: structuredClone(connect.password),
      }
    },

    setKindleConnect(connect: KindleConnect) {
      // Todo: Exists validation
      this[connect.id] = connect;
      // Todo: save file
    },

    saveKindleConnect(connect: KindleConnect) {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      const value = { [connect.id]: this.cloneKindleConnect(connect) };
      apiManager.configApi.saveConfig(settings.settingPath, CONFIG_CONNECTOR_KEY, value);
    },

    async testKindleSetting(connect: KindleConnect): Promise<boolean> {
      const apiManager = useApiManager();
      return await apiManager.connectApi.testKindle(connect.email, connect.password);
    },

    async collectKindleBooks(connect: KindleConnect) {
      const apiManager = useApiManager();
      const books = await apiManager.connectApi.collectKindle(connect.email, connect.password);
      return books;
    },

    deleteKindleSetting(id: string) {
      console.log('not implements');
      console.log(id);
      // Todo: implements
      // - show confirm dialog
      // - delete all books on delete connection
      // - delete connection
    },

    // --------------------------------
    //  debug
    // --------------------------------
    fillSample() {
      if (this.displays.length == 0) {
        this.setKindleConnect({id: '8bc4c5f7-87be-445b-9d51-631a0259dfb0', type: 'kindle', email:'sample@booklium', password:'sample'});
      }
    },

    logState() {
      console.log(this);
    }
  }
});
