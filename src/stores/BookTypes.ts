/**
 * Book Store.
 * 
 * books      -> all books. key is book.id.
 * connectors -> book index of connector. key is connector.id.
 */
export type BookStore = {
  books: Map<string, KindleBook | PDFBook>,
  connectorsIndex: Map<string, Book[]>,
};

/**
 * 
 */
export type Book = {
  id: string, //uuid
  type: ContentType,
  connectorId: string,
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

export type DisplayBook = {
  type: ContentType
  bookriumid: string
  title: string
  author: string
  image: string
};
