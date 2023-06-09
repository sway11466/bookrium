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
  books: Map<string, BookTypeDef>,
  index: {
    label: Map<string, Book[]>,
    connector: Map<string, Book[]>,
    latest: Queue<Book>,
  }
};

/**
 * Book Common attributes.
 * 
 *  id         -> uuid
 *  type       -> see @ContentType
 *  connectId  -> source connector id
 *  labels     -> label id array
 */
export type Book = {
  id: string,
  type: BookType,
  connectorId: string,
  title: string,
  author: string,
  artwork: string,
  labels: string[],
  extends: {}
}

/**
 * Kindle Book attributes.
 * 
 */
export type KindleExtends = {
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
export type KindleBook = Book & {
  extends: KindleExtends
};

/**
 * PDF Book attributes.
 * 
 */
export type PDFBook = Book & {
  extends: {
    hash: string,
    path: string,
    title: string,
    author: string,
    artworkPath: string,
  }
};

/**
 * 
 */
export type BookType = 'kindle' | 'pdf';
export type BookTypeDef = KindleBook | PDFBook;
