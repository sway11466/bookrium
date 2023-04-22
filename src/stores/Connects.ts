import { defineStore } from 'pinia';
import { ConnectApi, DisplayConnect, KindleConnect, LocalStrageConnect } from './ConnectTypes';

export const useConnectsStore = defineStore('connects', {
  
  state: () => ({
    connectApi: {} as ConnectApi,
    kindle: [] as KindleConnect[],
    localstrage: [] as LocalStrageConnect[]
  }),
  
  getters: {
    all (state) {
      const all : DisplayConnect[] = []
      state.kindle.forEach(e => all.push({
        id: e.email,
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
    bind (connectApi:ConnectApi) {
      this.connectApi = connectApi;
      console.log(typeof(connectApi));
    },

    async testKindleSetting (setting:KindleConnect) {
      await this.connectApi.testKindle(setting.email, setting.password);
    },

    addKindleSetting (setting:KindleConnect) {
      // Todo: Exists validation
      this.kindle.push(setting);
    },

    async collectKindleBooks () {
      const json = await this.connectApi.collectKindle();
      return json;
    },

    deleteKindleSetting () {
      console.log('not implements');
    },

    fillSample () {
      if (this.all.length == 0) {
        this.addKindleSetting({email:'sample@booklium', password:'sample'});
        this.localstrage.push({path:'./sample'});
      }
    },
  }
});
