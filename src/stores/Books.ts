import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { BookStore, Book, KindleBook, PDFBook } from 'src/stores/BookTypes';
import { useSettingsStore } from 'src/stores/Settings';
import { Queue } from 'src/components/Queue';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.books';

export const useBooksStore = defineStore('books', {

  state: (): BookStore => ({
    books: new Map(),
    index: {
      label: new Map(),
      connector: new Map(),
      latest: new Queue<Book>(10),
    }
  }),

  getters: {
    list: (state) => [...state.books.values()],
    latest: (state) => state.index.latest.array(),
  },

  actions: {
    async init() {
      await this.load();
      this.initLabelIndex();
      this.initConnectorIndx();
      this.initLatestIndex();
    },

    async initLabelIndex() {
      [...this.books.values()].forEach(book=> {
        book.labels.forEach(label => {
          const index = this.index.label.get(label) ?? [];
          index.push(book);
          if (!this.index.label.has(label)) {
            this.index.label.set(label, index);
          }
        })
      });
    },

    async initConnectorIndx() {
      (async () => {
        [...this.books.values()].forEach(book=> {
          const index = this.index.connector.get(book.connectorId) ?? [];
          index.push(book);
          if (!this.index.connector.has(book.connectorId)) {
            this.index.connector.set(book.connectorId, index);
          }
        });
      })();
    },

    async initLatestIndex() {
      [...this.books.values()].forEach(book=> this.index.latest.push(book));
    },

    async load() {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      const path = apiManager.path.join(settings.storage.bookFolderPath, 'books.json');
      const books = await apiManager.configApi.loadConfig(path, CONFIG_CONNECTOR_KEY) as Book[];
      Object.values(books).forEach(book => this.books.set(book.id, book as KindleBook | PDFBook));
    },

    newKindleBook(): KindleBook {
      return newKindleBook();
    },

    addBooks(books: KindleBook[] | PDFBook[]) {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      // add books
      books.forEach(book => this.books.set(book.id, book));
      // add label index
      // add connectors index
      for (const book of books) {
        const bookIndex = this.index.connector.get(book.connectorId) ?? [];
        bookIndex.push(book);
        if (!this.index.connector.has(book.connectorId)) {
          this.index.connector.set(book.connectorId, bookIndex);
        }
      };
      // save to file
      new Set(books.map(book => book.connectorId)).forEach(id => {
        const path = apiManager.path.join(settings.storage.bookFolderPath, id + '.json');
        apiManager.configApi.saveConfig(path, CONFIG_CONNECTOR_KEY, deproxyBook(this.index.connector.get(id) ?? []));
      });
    },
  }
});

const deproxyBook = (books: Book[]) => {
  const ret = [] as Book[];
  books.forEach(book => {
    switch (book.type) {
      case 'kindle':
        ret.push(deproxyKindleBook(book as KindleBook));
        break;
      default:
        break;
    }
  })
  return ret;
}

const deproxyKindleBook = (kindle: KindleBook): KindleBook => {
  return {
    id: kindle.id,
    type: kindle.type,
    connectorId: kindle.connectorId,
    labels: kindle.labels.concat([]),
    asin: kindle.asin,
    webReaderUrl: kindle.webReaderUrl,
    productUrl: kindle.productUrl,
    title: kindle.title,
    percentageRead: kindle.percentageRead,
    authors: kindle.authors.concat([]),
    resourceType: kindle.resourceType,
    originType: kindle.originType,
    mangaOrComicAsin: kindle.mangaOrComicAsin,
  }
}

const newKindleBook = (): KindleBook => {
  return {
    id: '',
    type: 'kindle',
    connectorId: '',
    labels: [] as string[],
    asin: '',
    webReaderUrl: '',
    productUrl: '',
    title: '',
    percentageRead: 0,
    authors: [] as string[],
    resourceType: '',
    originType: '',
    mangaOrComicAsin: false,
  }
}
