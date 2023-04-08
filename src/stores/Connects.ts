import { defineStore } from 'pinia';

type BaseConnect = {
  id: number
  type: ConnectType
  lastConnectAt: Date
};
type ConnectType = 'amazon' | 'localfile';

type AmazonConnect = BaseConnect & {
  userid: string
  password: string
};

type LocalFileConnect = BaseConnect & {
  path: string
};

export const useConnectsStore = defineStore('connects', {
  state: () => ({
    amazon: [] as AmazonConnect[],
    localfile: [] as LocalFileConnect[]
  }),

  getters: {
    all (state) {
      const all : BaseConnect[] = []
      state.amazon.forEach(e => all.push(e as BaseConnect))
      state.localfile.forEach(e => all.push(e as BaseConnect))
      return all
    }
  },

  actions: {
    loadFile () {
      // Todo
    },
    saveFile () {
      // Todo
    },
    fillSample () {
      this.amazon.push({id:0, type:'amazon', lastConnectAt:new Date, userid:'user', password:'password'});
      this.localfile.push({id:1, type:'localfile', lastConnectAt: new Date, path:'./'});
    },
    addAmazon (setting:AmazonConnect) {
      // Todo
    },
    addLocalFile () {
      // Todo
    },
    delete () {
      // Todo
    }
  }
});
