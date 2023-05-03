import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { BookStore, Book, KindleBook, PDFBook } from 'src/stores/BookTypes';
import { useSettingsStore } from 'src/stores/Settings';
import { useConnectsStore } from 'src/stores/Connects';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.books';

export const useBooksStore = defineStore('books', {

  state: (): BookStore => ({
    books: new Map(),
    connectorsIndex: new Map(),
  }),

  getters: {
    list: (state) => [...state.books.values()],
    blankKindle: () => blankKindleBook(),
  },

  actions: {
    async init() {
      const apiManager = useApiManager();
      const connectsStore = useConnectsStore();
      const settings = useSettingsStore();
      for (const id of connectsStore.connectIdList) {
        // load from file
        const path = apiManager.path.join(settings.storage.bookFolderPath, id + '.json');
        const books = await apiManager.configApi.loadConfig(path, CONFIG_CONNECTOR_KEY) as Book[];
        // add connectors index
        this.connectorsIndex.set(id, books);
        // add book
        Object.values(books).forEach(book => this.books.set(book.id, book as KindleBook | PDFBook));
      }
    },

    addBooks(books: KindleBook[] | PDFBook[]) {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      // add books
      books.forEach(book => this.books.set(book.id, book));
      // add connectors index
      for (const book of books) {
        const bookIndex = this.connectorsIndex.get(book.connectorId) ?? [];
        bookIndex.push(book);
        if (!this.connectorsIndex.has(book.connectorId)) {
          this.connectorsIndex.set(book.connectorId, bookIndex);
        }
      };
      // save to file
      new Set(books.map(book => book.connectorId)).forEach(id => {
        const path = apiManager.path.join(settings.storage.bookFolderPath, id + '.json');
        apiManager.configApi.saveConfig(path, CONFIG_CONNECTOR_KEY, deproxyBook(this.connectorsIndex.get(id) ?? []));
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
    tags: kindle.tags.concat([]),
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

const blankKindleBook = (): KindleBook => {
  return {
    id: '',
    type: 'kindle',
    connectorId: '',
    tags: [] as string[],
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
