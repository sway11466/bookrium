import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { BookStore, Book, KindleBook, PDFBook, BookTypeDef } from 'src/stores/BookTypes';
import { useSettingsStore } from 'src/stores/Settings';
import { ShowAppType } from 'src/stores/SettingTypes';
import { Queue } from 'src/components/Queue';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_BOOK_KEY = CONFIG_ROOT_KEY + '.books';

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
    },

    async load() {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      const path = apiManager.path.join(settings.storage.bookFolderPath, 'books.json');
      const books = await apiManager.configApi.loadConfig(path, CONFIG_BOOK_KEY) as Map<string, BookTypeDef>;
      this.addBooks([...Object.values(books)]);
    },

    newKindleBook(): KindleBook {
      return newKindleBook();
    },

    addBooks(books: BookTypeDef[]) {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      // save to file
      const path = apiManager.path.join(settings.storage.bookFolderPath, 'books.json');
      books.forEach(book => apiManager.configApi.saveConfig(path, CONFIG_BOOK_KEY + '.' + book.id, deproxyBook(book)));
      // update store
      books.forEach(book => this.books.set(book.id, book));
      this.addLabelIndex(books);  //async
      this.addConnectorIndx(books);  //async
      this.addLatestIndex(books);  //async
    },

    show(book: BookTypeDef): void {
      const apiManager = useApiManager();
      const setting = useSettingsStore();
      let url = '';
      let way: ShowAppType = 'builtin';
      switch (book.type) {
        case 'kindle':
          url = (book as KindleBook).webReaderUrl;
          way = setting.showapp.kindle;
          break;
        case 'pdf':
          url = (book as PDFBook).path;
          way = setting.showapp.pdf;
          break;
      }
      switch (way) {
        case 'builtin':
          apiManager.shellApi.openElectron(url, {});
          break;
        case 'os':
          apiManager.shellApi.openExternal(url, {});
          break;
      }
    },

    // Todo: Remove duplicates.
    async addLabelIndex(books: BookTypeDef[]) {
      books.forEach(book=> {
        book.labels.forEach(label => {
          const index = this.index.label.get(label) ?? [];
          index.push(book);
          if (!this.index.label.has(label)) {
            this.index.label.set(label, index);
          }
        })
      });
    },

    // Todo: Remove duplicates.
    async addConnectorIndx(books: BookTypeDef[]) {
      books.forEach(book=> {
        const index = this.index.connector.get(book.connectorId) ?? [];
        index.push(book);
        if (!this.index.connector.has(book.connectorId)) {
          this.index.connector.set(book.connectorId, index);
        }
      });
    },

    // Todo: Remove duplicates.
    async addLatestIndex(books: BookTypeDef[]) {
      books.forEach(book=> this.index.latest.push(book));
    },
  }
});

const deproxyBook = (book: BookTypeDef): BookTypeDef => {
  switch (book.type) {
    case 'kindle': return deproxyKindleBook(book as KindleBook);
    case 'pdf': return deproxyPDFBook(book as PDFBook);
  }
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

const deproxyPDFBook = (book: PDFBook): PDFBook => {
  return {
    id: book.id,
    type: book.type,
    connectorId: book.connectorId,
    labels: book.labels.concat([]),
    hash: book.hash,
    path: book.path,
    title: book.title,
    author: book.author,
    artworkPath: book.artworkPath,
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
