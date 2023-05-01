import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { useSettingsStore } from 'src/stores/Settings';
import { DisplayConnect, KindleConnect, LocalStorageConnect, Connect } from 'src/stores/ConnectTypes';

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
            id: kindle.id,
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
      this.fillSample(); // for debug
    },

    async loadAllConnects(): Promise<Connect> {
      const apiManager = useApiManager();
      return await apiManager.connectApi.hasConnectsSetting() ?
        await apiManager.connectApi.loadConnectsSetting() as Connect : this;
    },

    // --------------------------------
    //  kindle functions
    // --------------------------------
    setKindleConnect(connect: KindleConnect) {
      // Todo: Exists validation
      this[connect.id] = connect;
      // Todo: save file
    },

    saveKindleConnect(id: string) {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      apiManager.configApi.saveConfig(
        settings.settingPath,
        'connector',
        {}
      );
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
