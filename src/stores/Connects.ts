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
        id: e.userid,
        type: 'kindle',
        description: e.userid,
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

    async testKindleSetting (userid:string, password:string) {
      await this.connectApi.testKindle(userid, password);
    },

    addKindleSetting (userid:string, password:string) {
      console.log('not implements');
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
        this.kindle.push({userid:'sample', password:'sample'});
        this.localstrage.push({path:'./sample'});
      }
    },
  }
});
