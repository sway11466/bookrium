import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useApiManager } from 'src/stores/ApiManager';
import { useBooksStore  } from 'src/stores/Books';
import { useSettingsStore } from 'src/stores/Settings';
import { ConnectStore, Connect, ConnectType, KindleConnect, LocalStorageConnect, DisplayConnect } from 'src/stores/ConnectTypes';
import { KindleBook } from './BookTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.connectors';

export const useConnectsStore = defineStore('connects', {
  
  state: (): ConnectStore => ({
    connectors: new Map(),
  }),

  getters: {
    connectIdList: (state): string[] => [...state.connectors.keys()],
  },

  actions: {
    // Todo: move getters
    displays() :DisplayConnect[] {
      const all : DisplayConnect[] = [];
      for (const connect of this.connectors.values()) {
        switch (connect.type) {
          case 'kindle':
            const kindle = connect as KindleConnect;
            all.push({
              id: kindle.id,
              type: kindle.type,
              description: kindle.email,
              lastConnectAt: null,
              kindleConnect: kindle,
              LocalStrageConnect: null
            });
            break;
        }
      };
      return all
    },

    // --------------------------------
    //  comoon functions
    // --------------------------------
    async init(): Promise<void> {
      await this.loadAllConnects();
    },

    async loadAllConnects(): Promise<boolean> {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      if (!apiManager.configApi.hasConfig(settingsStore.settingPath)) { return false; }
      const connectors = (await apiManager.configApi.loadConfig(settingsStore.settingPath, CONFIG_CONNECTOR_KEY)) as Map<string, KindleConnect | LocalStorageConnect>;
      Object.entries(connectors).forEach(([key, value], index) => this.connectors.set(key, value));
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

    saveKindleConnect(connect: KindleConnect) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // add store if new connect
      if (!this.connectors.has(connect.id)) {
        this.connectors.set(connect.id, connect);
      }
      // save to file
      const key = CONFIG_CONNECTOR_KEY + '.' + connect.id;
      const value = deproxyKindleConnect(connect);
      apiManager.configApi.saveConfig(settingsStore.settingPath, key, value);
    },

    async testKindleSetting(connect: KindleConnect): Promise<boolean> {
      const apiManager = useApiManager();
      return await apiManager.connectApi.testKindle(connect.email, connect.password);
    },

    async collectKindleBooks(connect: KindleConnect) {
      const apiManager = useApiManager();
      const booksStore = useBooksStore();
      const books = await apiManager.connectApi.collectKindle(connect.email, connect.password) as KindleBook[];
      booksStore.addBooks(books);
      return books;
    },

    async deleteKindleSetting(id: string) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // Todo: show confirm dialog
      const key = CONFIG_CONNECTOR_KEY + '.' + id;
      await apiManager.configApi.deleteConfig(settingsStore.settingPath, key);
      this.connectors.delete(id);
      // Todo: delete all books on delete connection
    },
  }
});

const deproxyKindleConnect = (connect: KindleConnect): KindleConnect => {
  return {
    id: connect.id,
    type: connect.type,
    email: connect.email,
    password: connect.password,
  }
}
