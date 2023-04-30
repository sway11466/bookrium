import { defineStore } from 'pinia';
import { DisplayConnect, KindleConnect, LocalStorageConnect, ConnectorSetting } from 'src/stores/ConnectTypes';
import { ConnectApi } from 'app/src-electron/modules/connects/connect-api';

export const useConnectsStore = defineStore('connects', {
  
  state: () => ({
    connectApi: {} as ConnectApi,
    kindle: [] as KindleConnect[],
    localstrage: [] as LocalStorageConnect[]
  }),
  
  getters: {
    blankSetting() :ConnectorSetting {
      return {
        kindle: [] as KindleConnect[],
        localstrage: [] as LocalStorageConnect[],
      }
    },

    all(state) :DisplayConnect[] {
      const all : DisplayConnect[] = []
      state.kindle.forEach(e => all.push({
        id: e.id,
        type: 'kindle',
        description: e.email,
        lastConnectAt: null,
        kindleConnect: e,
        LocalStrageConnect: null
      }));
      state.localstrage.forEach(e => all.push({ 
        id: e.path,
        type: 'localstrage',
        description: e.path,
        lastConnectAt: null,
        kindleConnect: null,
        LocalStrageConnect: e
      }));
      return all
    }
  },

  actions: {
    // --------------------------------
    //  bind apis
    // --------------------------------
    bind(connectApi:ConnectApi) {
      this.connectApi = connectApi;
    },

    // --------------------------------
    //  comoon functions
    // --------------------------------
    async loadConnectsSetting() :Promise<ConnectorSetting> {
      return await this.connectApi.hasConnectsSetting() ?
        await this.connectApi.loadConnectsSetting() as ConnectorSetting : this.blankSetting;
    },

    async saveConnectsSetting(setting :ConnectorSetting) :Promise<boolean> {
      this.connectApi.saveConnectsSetting(setting);
      // TODO: error handling
      return true;
    },

    // --------------------------------
    //  kindle functions
    // --------------------------------
    addKindleSetting(setting:KindleConnect) {
      // Todo: Exists validation
      this.kindle.push(setting);
    },

    getKindleSetting(id:string) :KindleConnect {
      const index = this.kindle.findIndex((kindle) => kindle.id == id);
      if (index == -1) { throw new Error('') } // TODO: implements error handling
      return this.kindle[index];
    },

    async testKindleSetting(setting:KindleConnect) :Promise<boolean> {
      return await this.connectApi.testKindle(setting.email, setting.password);
    },

    async collectKindleBooks(setting:KindleConnect) {
      const books = await this.connectApi.collectKindle(setting.email, setting.password);
      return books;
    },

    deleteKindleSetting() {
      console.log('not implements');
    },

    // --------------------------------
    //  debug
    // --------------------------------
    fillSample() {
      if (this.all.length == 0) {
        this.addKindleSetting({id: '1', email:'sample@booklium', password:'sample'});
        this.localstrage.push({path:'./sample'});
      }
    },

    logState() {
      console.log(this);
    }
  }
});
