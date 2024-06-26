import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useApiManager } from 'src/stores/ApiManager';
import { useBooksStore  } from 'src/stores/Books';
import { useSettingsStore } from 'src/stores/Settings';
import { ConnectStore, ConnectType, Connect, KindleConnect, PDFLocalStorageConnect, ImgDirLocalStorageConnect } from 'src/stores/ConnectTypes';
import { KindleBook, PDFBook, ImgDirBook } from 'src/stores/BookTypes';

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
      if (!apiManager.configApi.hasConfig(settingsStore.settingPath, CONFIG_CONNECTOR_KEY)) { return false; }
      const connectors = (await apiManager.configApi.loadConfig(settingsStore.settingPath, CONFIG_CONNECTOR_KEY)) as Map<string, Connect>;
      for (const [key, value] of Object.entries(connectors)) { this.connectors.set(key, Object.assign(this.new(value.type), value)); };
      return true;
    },

    new(type: ConnectType): Connect {
      switch (type) {
        case 'kindle': return newKindleConnect();
        case 'pdfls': return newPDFLocalStorageConnect();
        case 'imgdirls': return newImgDirLocalStorageConnect();
      }
    },

    clone(id: string): Connect {
      const connect = this.get(id);
      return this.deproxy(connect);
    },

    async add(connect: Connect) {
      await this.update(connect);
    },

    has(id: string): boolean {
      return this.connectors.has(id);
    },

    get(id: string): Connect {
      if (this.connectors.has(id)) {
        return this.connectors.get(id) as Connect;
      } else {
        throw new Error(); //Todo implements
      }
    },

    async update(connect: Connect) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // update store
      this.connectors.set(connect.id, connect);
      // save to file
      let value = {};
      switch (connect.type) {
        case 'kindle': value = deproxyKindleConnect(connect as KindleConnect); break;
        case 'pdfls': value = deproxyPDFLocalStorageConnect(connect as PDFLocalStorageConnect); break;
        case 'imgdirls': value = deproxyImgDirLocalStorageConnect(connect as ImgDirLocalStorageConnect); break;
      }
      const key = CONFIG_CONNECTOR_KEY + '.' + connect.id;
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

    deproxy(connect: Connect): Connect {
      switch (connect.type) {
        case 'kindle': return deproxyKindleConnect(connect as KindleConnect);
        case 'pdfls': return deproxyPDFLocalStorageConnect(connect as PDFLocalStorageConnect);
        case 'imgdirls': return deproxyImgDirLocalStorageConnect(connect as ImgDirLocalStorageConnect);
      }
    },

    // Todo: Error Handling
    async test(connect: Connect): Promise<boolean> {
      const apiManager = useApiManager();
      switch (connect.type) {
        case 'kindle': return await apiManager.connectApi.testKindle((connect as KindleConnect).extends.email, (connect as KindleConnect).extends.password);
        case 'pdfls': return await apiManager.connectApi.testPdfLs((connect as PDFLocalStorageConnect).extends.path);
        case  'imgdirls': return await apiManager.connectApi.testImgDirLs((connect as ImgDirLocalStorageConnect).extends.path);
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
    //  PDF LocalStorage functions
    // --------------------------------

    async collectPDFLocalStorageConnect(connect: PDFLocalStorageConnect): Promise<number> {
      const apiManager = useApiManager();
      const settingStore = useSettingsStore();
      const books = await apiManager.connectApi.collectPdfLs(deproxyPDFLocalStorageConnect(connect), settingStore.deproxy()) as PDFBook[];
      const booksStore = useBooksStore();
      booksStore.add(books);
      return books.length;
    },

    // --------------------------------
    //  Image Directory LocalStorage functions
    // --------------------------------

    async collectImgDirLocalStorageConnect(connect: ImgDirLocalStorageConnect): Promise<number> {
      const apiManager = useApiManager();
      const settingStore = useSettingsStore();
      const books = await apiManager.connectApi.collectImgDirLs(deproxyImgDirLocalStorageConnect(connect), settingStore.deproxy()) as ImgDirBook[];
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
    name: '',
    lastCollect: null,
    type: 'kindle',
    bookCount: -1,
    state: {
      test: 'none',
      collect: 'none',
    },
    extends: {
      email: '',
      password: '',
    }
  }
}

const deproxyKindleConnect = (connect: KindleConnect): KindleConnect => {
  return {
    id: connect.id,
    name: connect.name,
    lastCollect: connect.lastCollect,
    type: connect.type,
    bookCount: connect.bookCount,
    state: {
      test: connect.state.test,
      collect: connect.state.collect,
    },
    extends: {
      email: connect.extends.email,
      password: connect.extends.password,
    }
  }
}

// --------------------------------
//  PDFLocalStorage functions
// --------------------------------
const newPDFLocalStorageConnect = (): PDFLocalStorageConnect => {
  return {
    id: uuid(),
    name: '',
    lastCollect: null,
    type: 'pdfls',
    bookCount: -1,
    state: {
      test: 'none',
      collect: 'none',
    },
    extends: {
      path: '',
    }
  }
}

const deproxyPDFLocalStorageConnect = (connect: PDFLocalStorageConnect): PDFLocalStorageConnect => {
  return {
    id: connect.id,
    name: connect.name,
    lastCollect: connect.lastCollect,
    type: connect.type,
    bookCount: connect.bookCount,
    state: {
      test: connect.state.test,
      collect: connect.state.collect,
    },
    extends: {
      path: connect.extends.path,
    }
  }
}

// --------------------------------
//  Image Directory LocalStorage functions
// --------------------------------
const newImgDirLocalStorageConnect = (): ImgDirLocalStorageConnect => {
  return {
    id: uuid(),
    name: '',
    lastCollect: null,
    type: 'imgdirls',
    bookCount: -1,
    state: {
      test: 'none',
      collect: 'none',
    },
    extends: {
      path: '',
    }
  }
}

const deproxyImgDirLocalStorageConnect = (connect: ImgDirLocalStorageConnect): ImgDirLocalStorageConnect => {
  return {
    id: connect.id,
    name: connect.name,
    lastCollect: connect.lastCollect,
    type: connect.type,
    bookCount: connect.bookCount,
    state: {
      test: connect.state.test,
      collect: connect.state.collect,
    },
    extends: {
      path: connect.extends.path,
    }
  }
}
