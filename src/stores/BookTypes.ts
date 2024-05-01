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
  books: Map<string, Book>,
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
 *  type       -> see @BookType
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
  extends: KindleExtends | PDFExtends | ImgDirExtends,
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
export type PDFExtends = {
  hash: string,
  path: string,
  title: string,
  author: string,
  artworkPath: string,
};
export type PDFBook = Book & {
  extends: PDFExtends
};

/**
 * Image Directory Book attributes.
 * 
 */
export type ImgDirExtends = {
  hash: string,
  path: string,
  title: string,
  author: string,
  artworkPath: string,
  readingPath: string,
};
export type ImgDirBook = Book & {
  extends: ImgDirExtends
};

/**
 * 
 */
export type BookType = 'kindle' | 'pdf' | 'imgdir';
export type BookTypeDef = KindleBook | PDFBook | ImgDirBook;

/**
 * 
 */
export type BookSortType = 'none' | 'title_ascending' | 'title_descending' | 'author_ascending' | 'author_descending';
