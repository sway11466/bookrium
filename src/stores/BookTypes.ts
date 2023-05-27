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
  type: ContentType,
  connectorId: string,
  labels: string[],
}

/**
 * Kindle Book attributes.
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
 * PDF Book attributes.
 * 
 */
export type PDFBook = Book & {
  hash: string,
  path: string,
  title: string,
  author: string,
  artworkPath: string,
};

/**
 * 
 */
export type ContentType = 'kindle' | 'pdf';
export type BookTypeDef = KindleBook | PDFBook;
