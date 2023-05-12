import { Queue } from 'src/components/Queue';

/**
 * Book Store.
 * 
 * books      -> all books. key is book.id.
 * index
 *   label      -> book index of label. key is label id.
 *   connectors -> book index of connector. key is connector id.
 *   latest     -> book index of top x latest books.
 */
export type BookStore = {
  books: Map<string, KindleBook | PDFBook>,
  index: {
    label: Map<string, Book[]>,
    connector: Map<string, Book[]>,
    latest: Queue<Book>,
  }
};

/**
 * 
 */
export type Book = {
  id: string, //uuid
  type: ContentType,
  connectorId: string,
  labels: string[],
}

/**
 * 
 */
export type KindleBook = Book & {
  asin: string,
  webReaderUrl: string,
  productUrl: string,
  title: string,
  percentageRead: number,
  authors: string[],
  resourceType: string,
  originType: string,
  mangaOrComicAsin: boolean,
};

/**
 * 
 */
export type PDFBook = Book & {
  path: string,
};

/**
 * 
 */
export type ContentType = 'kindle' | 'pdf';
