import { Book } from './BookTypes';

/**
 * BookGroup Store.
 */
export type BookGroupStore = {
  books: Map<string, BookGroup>,  // key is book group id
};

/**
 * BookGroup Attributes.
 */
export type BookGroup = {
  id: string,                // uuid
  name: string,
  books: Map<string, Book>,  // key is book id
};
