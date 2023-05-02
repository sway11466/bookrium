import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { BookStore, Book, KindleBook, DisplayBook, PDFBook } from 'src/stores/BookTypes';
import { KindleConnect } from 'src/stores/ConnectTypes';
import { useSettingsStore } from 'src/stores/Settings';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.books';
const apiManager = useApiManager();

export const useBooksStore = defineStore('books', {

  state: (): BookStore => ({
    books: new Map(),
    connectors: new Map(),
  }),

  getters: {
    display (state) :DisplayBook[] {
      const books :DisplayBook[] = [];
      for (const book of state.books.values()) {
        switch (book.type) {
          case 'kindle':
            const kindle = book as KindleBook;
            books.push({
              type: 'kindle',
              bookriumid: kindle.asin,
              title: kindle.title,
              author: kindle.authors.join(','),
              image: kindle.productUrl,
            })
            break;
          default:
            break;
        }
      }
      return books;
    }
  },

  actions: {
    addBooks(books: KindleBook[] | PDFBook[]) {
      const settings = useSettingsStore();
      // books
      books.forEach(book => this.books.set(book.id, book));
      // connectors index
      for (const book of books) {
        const bookIndex = this.connectors.get(book.connectorId) ?? [];
        bookIndex.push(book);
        if (!this.connectors.has(book.connectorId)) {
          this.connectors.set(book.connectorId, bookIndex);
        }
      };
      // save
      // const temp = Array.from(new Set(books.map(book => book.connector.id)));
      new Set(books.map(book => book.connectorId)).forEach(id => {
        const path = apiManager.path.join(settings.storage.bookFolderPath, id + '.json');
        apiManager.configApi.saveConfig(path, CONFIG_CONNECTOR_KEY, deproxyBook(this.connectors.get(id) ?? []));
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
