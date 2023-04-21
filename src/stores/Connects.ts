import { defineStore } from 'pinia';

type BaseConnect = {
  id: number
  type: ConnectType
  lastConnectAt: Date | null
};
type ConnectType = 'kindle' | 'localfile';

type KindleConnect = BaseConnect & {
  userid: string
  password: string
};

type LocalFileConnect = BaseConnect & {
  path: string
};

interface ConnectApi {
  kindleTest: (userid: string, password: string) => Promise<void>
  kindleCollect: () => Promise<string>
}

export const useConnectsStore = defineStore('connects', {
  
  state: () => ({
    connectApi: {} as ConnectApi,
    kindle: [] as KindleConnect[],
    localfile: [] as LocalFileConnect[]
  }),
  
  getters: {
    all (state) {
      const all : BaseConnect[] = []
      state.kindle.forEach(e => all.push(e as BaseConnect))
      state.localfile.forEach(e => all.push(e as BaseConnect))
      return all
    }
  },

  actions: {
    bind (connectApi:ConnectApi) {
      this.connectApi = connectApi;
      console.log(typeof(connectApi));
    },

    async kindleTest (userid:string, password:string) {
      await this.connectApi.kindleTest(userid, password);
    },

    kindleAdd () {
      console.log('not implements');
    },

    async kindleCollect () {
      await this.connectApi.kindleCollect();
    },

    kindleDelete () {
      console.log('not implements');
    },

    fillSample () {
      if (this.all() == 0) {
        this.kindle.push({id:0, type:'kindle', lastConnectAt:null, userid:'sample', password:'sample'});
        this.localfile.push({id:1, type:'localfile', lastConnectAt:null, path:'./sample'});
      }
    },
  }
});
