import { defineStore } from 'pinia';
import { DisplayBook, KindleBook, KindleSamples } from './BookTypes';

export const useBooksStore = defineStore('books', {
  state: () => ({
    kindles: new Map() as Map<string, KindleBook>
  }),

  getters: {
    display (state) :DisplayBook[] {
      const books :DisplayBook[] = [];
      [...state.kindles.values()].forEach(kindle => {
        books.push({
          type: 'kindle',
          bookriumid: kindle.asin,
          title: kindle.title,
          author: kindle.authors.join(','),
          image: kindle.productUrl,
        })
      })
      return books;
    }
  },

  actions: {
    fillSample () {
      if (this.kindles.size == 0) {
        KindleSamples.forEach(i => this.kindles.set(i.asin, i))
      }
    },

    addKindleBooks (books: KindleBook[]) {
      books.forEach(book => this.kindles.set(book.asin, book));
    }
  }
});
