import { defineStore } from 'pinia';
import { BookStore, Book, KindleBook, KindleSamples, DisplayBook, PDFBook } from 'src/stores/BookTypes';

export const useBooksStore = defineStore('books', {

  state: (): BookStore => ({
    books: new Map(),
    connectors: new Map(),
  }),

  getters: {
    display (state) :DisplayBook[] {
      const books :DisplayBook[] = [];
      for (const book of state.books.values()) {
        const kindle = book as KindleBook;
        books.push({
          type: 'kindle',
          bookriumid: kindle.asin,
          title: kindle.title,
          author: kindle.authors.join(','),
          image: kindle.productUrl,
        })
      }
      return books;
    }
  },

  actions: {
    addBooks(books: KindleBook[] | PDFBook[]) {
      // books
      books.forEach(book => this.books.set(book.id, book));
      // connectors
      for (const book of books) {
        const bookIndex = this.connectors.get(book.connector.id) ?? [];
        bookIndex.push(book);
        if (!this.connectors.has(book.connector.id)) {
          this.connectors.set(book.connector.id, bookIndex);
        }
      };
    },

    fillSample() {
      this.addBooks(KindleSamples);
    },
  }
});
