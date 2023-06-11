import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useApiManager } from 'src/stores/ApiManager';
import { useBooksStore  } from 'src/stores/Books';
import { useSettingsStore } from 'src/stores/Settings';
import { ConnectStore, ConnectType, Connect, KindleConnect, PDFLocalStorageConnect, ConnectTypeDef } from 'src/stores/ConnectTypes';
import { KindleBook, PDFBook } from 'src/stores/BookTypes';

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

    /**
     * 
     * connect setting may be added or changed. For this reason, when loading, the item is overwritten with a new item and imported into the store.
     */
    async loadAllConnects(): Promise<boolean> {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      if (!apiManager.configApi.hasConfig(settingsStore.settingPath)) { return false; }
      const connectors = (await apiManager.configApi.loadConfig(settingsStore.settingPath, CONFIG_CONNECTOR_KEY)) as Map<string, ConnectTypeDef>;
      for (const [key, value] of Object.entries(connectors)) { this.connectors.set(key, Object.assign(this.new(value.type), value)); };
      return true;
    },

    new(type: ConnectType): ConnectTypeDef {
      switch (type) {
        case 'kindle': return newKindleConnect();
        case 'pdfls': return newPDFLocalStorageConnect();
      }
    },

    clone(id: string): ConnectTypeDef {
      const connect = this.get(id);
      return this.deproxy(connect);
    },

    async add(connect: ConnectTypeDef) {
      await this.update(connect);
    },

    has(id: string): boolean {
      return this.connectors.has(id);
    },

    get(id: string): ConnectTypeDef {
      if (this.connectors.has(id)) {
        return this.connectors.get(id) as ConnectTypeDef;
      } else {
        throw new Error(); //Todo implements
      }
    },

    async update(connect: ConnectTypeDef) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // update store
      this.connectors.set(connect.id, connect);
      // save to file
      const key = CONFIG_CONNECTOR_KEY + '.' + connect.id;
      let value = {};
      switch (connect.type) {
        case 'kindle': value = deproxyKindleConnect(connect as KindleConnect); break;
        case 'pdfls': value = deproxyPDFLocalStorageConnect(connect as PDFLocalStorageConnect); break;
      }
      apiManager.configApi.saveConfig(settingsStore.settingPath, key, value);
    },

    del(id: string): boolean {
      // Validation
      if (!this.connectors.has(id)) {
        throw new Error(); //Todo implements
      }
      // delete from store
      this.connectors.delete(id);
      // delete from file
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      const key = CONFIG_CONNECTOR_KEY + '.' + id;
      apiManager.configApi.deleteConfig(settingsStore.settingPath, key);
      // Todo: delete all books on delete connection

      return true;
    },

    deproxy(connect: ConnectTypeDef): ConnectTypeDef {
      switch (connect.type) {
        case 'kindle': return deproxyKindleConnect(connect as KindleConnect);
        case 'pdfls': return deproxyPDFLocalStorageConnect(connect as PDFLocalStorageConnect);
      }
    },

    // Todo: Error Handling
    async test(connect: ConnectTypeDef): Promise<boolean> {
      const apiManager = useApiManager();
      switch (connect.type) {
        case 'kindle': return await apiManager.connectApi.testKindle((connect as KindleConnect).email, (connect as KindleConnect).password);
        case 'pdfls': return await apiManager.connectApi.testPdfLs((connect as PDFLocalStorageConnect).path);
      }
    },

    // --------------------------------
    //  kindle functions
    // --------------------------------

    async collectKindleBooks(connect: KindleConnect): Promise<number> {
      const apiManager = useApiManager();
      const books = await apiManager.connectApi.collectKindle(deproxyKindleConnect(connect)) as KindleBook[];
      const booksStore = useBooksStore();
      booksStore.add(books);
      return books.length;
    },

    // --------------------------------
    //  PDFLocalStorage functions
    // --------------------------------

    async collectPDFLocalStorageConnect(connect: PDFLocalStorageConnect): Promise<number> {
      // collect books
      const apiManager = useApiManager();
      const settingStore = useSettingsStore();
      const books = await apiManager.connectApi.collectPdfLs(deproxyPDFLocalStorageConnect(connect), settingStore.deproxy()) as PDFBook[];
      const booksStore = useBooksStore();
      booksStore.add(books);
      return books.length;
    },
  }
});

// --------------------------------
//  kindle functions
// --------------------------------
const newKindleConnect = (): KindleConnect => {
  return {
    id: uuid(),
    type: 'kindle' as ConnectType,
    bookCount: -1,
    state: {
      test: 'none',
      collect: 'none',
    },
    email: '',
    password: '',
  }
}

const deproxyKindleConnect = (connect: KindleConnect): KindleConnect => {
  return {
    id: connect.id,
    type: connect.type,
    bookCount: connect.bookCount,
    state: {
      test: connect.state.test,
      collect: connect.state.collect,
    },
    email: connect.email,
    password: connect.password,
  }
}

// --------------------------------
//  PDFLocalStorage functions
// --------------------------------
const newPDFLocalStorageConnect = (): PDFLocalStorageConnect => {
  return {
    id: uuid(),
    type: 'pdfls' as ConnectType,
    bookCount: -1,
    state: {
      test: 'none',
      collect: 'none',
    },
    path: '',
  }
}

const deproxyPDFLocalStorageConnect = (connect: PDFLocalStorageConnect): PDFLocalStorageConnect => {
  return {
    id: connect.id,
    type: connect.type,
    bookCount: connect.bookCount,
    state: {
      test: connect.state.test,
      collect: connect.state.collect,
    },
    path: connect.path,
  }
}
