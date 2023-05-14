import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useApiManager } from 'src/stores/ApiManager';
import { useBooksStore  } from 'src/stores/Books';
import { useSettingsStore } from 'src/stores/Settings';
import { ConnectStore, ConnectDivision, Connect, KindleConnect, PDFLocalStorageConnect, ConnectType } from 'src/stores/ConnectTypes';
import { KindleBook } from 'src/stores/BookTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.connectors';

export const useConnectsStore = defineStore('connects', {
  
  state: (): ConnectStore => ({
    connectors: new Map(),
  }),

  getters: {
    list: (state): Connect[] => [...state.connectors.values()],
    connectIdList: (state): string[] => [...state.connectors.keys()],
  },

  actions: {

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
      const connectors = (await apiManager.configApi.loadConfig(settingsStore.settingPath, CONFIG_CONNECTOR_KEY)) as Map<string, ConnectType>;
      Object.entries(connectors).forEach(([key, value]) => this.connectors.set(key, value));
      return true;
    },

    async save(connect: ConnectType) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // add store if new connect
      if (!this.connectors.has(connect.id)) {
        this.connectors.set(connect.id, connect);
      }
      // save to file
      const key = CONFIG_CONNECTOR_KEY + '.' + connect.id;
      let value = {};
      switch (connect.type) {
        case 'kindle': value = deproxyKindleConnect(connect as KindleConnect); break;
        case 'pdfls': value = deproxyPDFLocalStorageConnect(connect as PDFLocalStorageConnect); break;
      }
      apiManager.configApi.saveConfig(settingsStore.settingPath, key, value);
    },

    new(division: ConnectDivision): ConnectType {
      switch (division) {
        case 'kindle': return this.newKindleConnect();
        case 'pdfls': return this.newPDFLocalStorageConnect();
      }
      throw new Error(); //Todo implements
    },

    get(id: string): ConnectType {
      if (this.connectors.has(id)) {
        return this.connectors.get(id) as ConnectType;
      } else {
        throw new Error(); //Todo implements
      }
    },

    // --------------------------------
    //  kindle functions
    // --------------------------------
    newKindleConnect(): KindleConnect {
      return {
        id: uuid(),
        type: 'kindle' as ConnectDivision,
        email: '',
        password: '',
      }
    },

    async testKindleSetting(connect: KindleConnect): Promise<boolean> {
      const apiManager = useApiManager();
      return await apiManager.connectApi.testKindle(connect.email, connect.password);
    },

    // Todo: use common function.
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

    async collectKindleBooks(connect: KindleConnect): Promise<boolean> {
      const apiManager = useApiManager();
      const booksStore = useBooksStore();
      const collected = await apiManager.connectApi.collectKindle(connect.email, connect.password) as KindleBook[];
      const books = [] as KindleBook[];
      for (const book of Object.values(collected)) {
        books.push({
          id: uuid(),
          type: 'kindle',
          connectorId: connect.id,
          labels: [],
          asin: book.asin,
          webReaderUrl: book.webReaderUrl,
          productUrl: book.productUrl,
          title: book.title,
          percentageRead: book.percentageRead,
          authors: book.authors,
          resourceType: book.resourceType,
          originType: book.originType,
          mangaOrComicAsin: book.mangaOrComicAsin,
        });
      }
      booksStore.addBooks(books);
      return true;
    },

    async deleteKindleSetting(id: string) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // delete from store
      this.connectors.delete(id);
      // Todo: delete all books on delete connection
      // delete from file
      const key = CONFIG_CONNECTOR_KEY + '.' + id;
      await apiManager.configApi.deleteConfig(settingsStore.settingPath, key);
    },

    // --------------------------------
    //  PDFLocalStorage functions
    // --------------------------------
    newPDFLocalStorageConnect(): PDFLocalStorageConnect {
      return {
        id: uuid(),
        type: 'pdfls' as ConnectDivision,
        path: '',
      }
    },

    async testPDFLocalStorageConnect(connect: PDFLocalStorageConnect): Promise<boolean> {
      const apiManager = useApiManager();
      const list = await apiManager.localStorageApi.readdirSync(connect.path, { filter: /.pdf$/ }) as string[];
      return list.length > 0;
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

const deproxyPDFLocalStorageConnect = (connect: PDFLocalStorageConnect): PDFLocalStorageConnect => {
  return {
    id: connect.id,
    type: connect.type,
    path: connect.path,
  }
}
