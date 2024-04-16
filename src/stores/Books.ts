import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { BookStore, Book, KindleBook, PDFBook, BookType, BookSortType, BookTypeDef } from 'src/stores/BookTypes';
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
      this._addStore([...Object.values(books)]);
    },

    new(type: BookType): BookTypeDef {
      switch (type) {
        case 'kindle': return newKindleBook();
        case 'pdf': return newPDFBook();
      }
    },

    add(books: BookTypeDef[]) {
      const apiManager = useApiManager();
      const settings = useSettingsStore();
      // save to file
      const path = apiManager.path.join(settings.storage.bookFolderPath, 'books.json');
      books.forEach(book => apiManager.configApi.saveConfig(path, CONFIG_BOOK_KEY + '.' + book.id, deproxyBook(book)));
      // update store
      this._addStore(books);
    },
    _addStore(books: BookTypeDef[]) {
      books.forEach(book => this.books.set(book.id, book));
      this.createLabelIndex(books);  //async
      this.createConnectorIndx(books);  //async
      this.createLatestIndex(books);  //async
    },

    has(id: string): boolean {
      return this.books.has(id);
    },

    get(id: string): BookTypeDef {
      if (this.has(id)) {
        return this.books.get(id) as BookTypeDef;
      }
      throw new Error('book not found.'); //Todo: implements
    },

    slice(index: number, size: number): Book[] {
      return [...this.books.values()].slice(index, size);
    },

    show(book: Book): void {
      const apiManager = useApiManager();
      const setting = useSettingsStore();
      let url = '';
      let way: ShowAppType = 'builtin';
      switch (book.type) {
        case 'kindle':
          url = (book as KindleBook).extends.webReaderUrl;
          way = setting.showapp.kindle;
          break;
        case 'pdf':
          url = (book as PDFBook).extends.path;
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
    async createLabelIndex(books: BookTypeDef[]) {
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
    async createConnectorIndx(books: BookTypeDef[]) {
      books.forEach(book=> {
        const index = this.index.connector.get(book.connectorId) ?? [];
        index.push(book);
        if (!this.index.connector.has(book.connectorId)) {
          this.index.connector.set(book.connectorId, index);
        }
      });
    },

    // Todo: Remove duplicates.
    async createLatestIndex(books: BookTypeDef[]) {
      books.forEach(book=> this.index.latest.push(book));
    },

    sort(type: BookSortType): Book[] {
      switch (type) {
        case 'author_ascending':
          return this.list.sort((a, b) => {
            if (a.author < b.author) { return -1; }
            if (a.author > b.author) { return 1; }
            return 0;
          });
        case 'author_descending':
          return this.list.sort((a, b) => {
            if (a.author > b.author) { return -1; }
            if (a.author < b.author) { return 1; }
            return 0;
          });
        case 'title_ascending':
          return this.list.sort((a, b) => {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
          });
        case 'title_descending':
          return this.list.sort((a, b) => {
            if (a.title > b.title) { return -1; }
            if (a.title < b.title) { return 1; }
            return 0;
          });
        default:
          return this.list;
      }
    },
  }
});

const deproxyBook = (book: BookTypeDef): BookTypeDef => {
  switch (book.type) {
    case 'kindle': return deproxyKindleBook(book as KindleBook);
    case 'pdf': return deproxyPDFBook(book as PDFBook);
  }
}

// --------------------------------
//  kindle functions
// --------------------------------

const newKindleBook = (): KindleBook => {
  return {
    id: '',
    type: 'kindle',
    connectorId: '',
    title: '',
    author: '',
    artwork: '',
    labels: [] as string[],
    extends: {
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
}

const deproxyKindleBook = (kindle: KindleBook): KindleBook => {
  return {
    id: kindle.id,
    type: kindle.type,
    connectorId: kindle.connectorId,
    title: kindle.title,
    author: kindle.author,
    artwork: kindle.artwork,
    labels: kindle.labels,
    extends: {
      asin: kindle.extends.asin,
      webReaderUrl: kindle.extends.webReaderUrl,
      productUrl: kindle.extends.productUrl,
      title: kindle.extends.title,
      percentageRead: kindle.extends.percentageRead,
      authors: kindle.extends.authors,
      resourceType: kindle.extends.resourceType,
      originType: kindle.extends.originType,
      mangaOrComicAsin: kindle.extends.mangaOrComicAsin,
    }
  }
}

// --------------------------------
//  pdf functions
// --------------------------------

const newPDFBook = (): PDFBook => {
  return {
    id: '',
    type: 'pdf',
    connectorId: '',
    title: '',
    author: '',
    artwork: '',
    labels: [] as string[],
    extends: {
      hash: '',
      path: '',
      title: '',
      author: '',
      artworkPath: '',
    }
  }
}

const deproxyPDFBook = (book: PDFBook): PDFBook => {
  return {
    id: book.id,
    type: book.type,
    connectorId: book.connectorId,
    title: book.title,
    author: book.author,
    artwork: book.artwork,
    labels: book.labels.concat([]),
    extends: {
      hash: book.extends.hash,
      path: book.extends.path,
      title: book.extends.title,
      author: book.extends.author,
      artworkPath: book.extends.artworkPath,
    }
  }
}
