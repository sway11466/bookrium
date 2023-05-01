import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { DisplayConnect, KindleConnect, LocalStorageConnect, Connect } from 'src/stores/ConnectTypes';

export const useConnectsStore = defineStore('connects', {
  
  state: (): Connect => ({
    kindle: [] as KindleConnect[],
    localstrage: [] as LocalStorageConnect[]
  }),
  
  getters: {
    displays(state) :DisplayConnect[] {
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
    //  comoon functions
    // --------------------------------
    async loadConnectsSetting() :Promise<Connect> {
      const apiManager = useApiManager();
      return await apiManager.connectApi.hasConnectsSetting() ?
        await apiManager.connectApi.loadConnectsSetting() as Connect : this;
    },

    async saveConnectsSetting(setting :Connect) :Promise<boolean> {
      const apiManager = useApiManager();
      apiManager.connectApi.saveConnectsSetting(setting);
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
      const apiManager = useApiManager();
      return await apiManager.connectApi.testKindle(setting.email, setting.password);
    },

    async collectKindleBooks(setting:KindleConnect) {
      const apiManager = useApiManager();
      const books = await apiManager.connectApi.collectKindle(setting.email, setting.password);
      return books;
    },

    deleteKindleSetting() {
      console.log('not implements');
    },

    // --------------------------------
    //  debug
    // --------------------------------
    fillSample() {
      if (this.displays.length == 0) {
        this.addKindleSetting({id: '1', email:'sample@booklium', password:'sample'});
        this.localstrage.push({path:'./sample'});
      }
    },

    logState() {
      console.log(this);
    }
  }
});
