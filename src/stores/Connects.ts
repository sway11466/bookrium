import { defineStore } from 'pinia';
import { ConnectApi, DisplayConnect, KindleConnect, LocalStrageConnect } from './ConnectTypes';

export const useConnectsStore = defineStore('connects', {
  
  state: () => ({
    connectApi: {} as ConnectApi,
    kindle: [] as KindleConnect[],
    localstrage: [] as LocalStrageConnect[]
  }),
  
  getters: {
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
    //  common
    // --------------------------------
    bind(connectApi:ConnectApi) {
      this.connectApi = connectApi;
    },

    // --------------------------------
    //  kindle functions
    // --------------------------------
    getKindleSetting(id:string) :KindleConnect {
      const index = this.kindle.findIndex((kindle) => kindle.id == id);
      return index >= 0 ? this.kindle[index] : { id:'0', email:'', password:'' };
    },

    async testKindleSetting(setting:KindleConnect) {
      await this.connectApi.testKindle(setting.email, setting.password);
    },

    addKindleSetting(setting:KindleConnect) {
      // Todo: Exists validation
      this.kindle.push(setting);
    },

    async collectKindleBooks() {
      const json = await this.connectApi.collectKindle();
      return json;
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
