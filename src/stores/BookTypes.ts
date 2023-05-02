import { KindleConnect, LocalStorageConnect } from 'src/stores/ConnectTypes';

/**
 * Book Store.
 * 
 * books      -> all books. key is book.id.
 * connectors -> book index of connector. key is connector.id.
 */
export type BookStore = {
  books: Map<string, KindleBook | PDFBook>,
  connectors: Map<string, Book[]>,
};

/**
 * 
 */
export type Book = {
  id: string, //uuid
  connector: KindleConnect | LocalStorageConnect
}

/**
 * 
 */
export type KindleBook = Book & {
  asin: string,
  webReaderUrl: URL,
  productUrl: URL,
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
export type ConnectType = 'kindle' | 'pdf';

export type DisplayBook = {
  type: ConnectType
  bookriumid: string
  title: string
  author: string
  image: URL
};

export const KindleSamples :KindleBook[] = [
  {
    id: 'book-sample-1',
    connector: {id:'', type:'localstrage', path:''},
    asin: 'B079Y1WDVZ',
    webReaderUrl: new URL('https://read.amazon.co.jp/kindle-library/manga-wr/B079Y1WDVZ'),
    productUrl: new URL('https://m.media-amazon.com/images/I/61LjdewoX5L._SY400_.jpg'),
    percentageRead: 0,
    title: 'Dr.STONE 5 (ジャンプコミックスDIGITAL) (Japanese Edition)',
    authors: [
        '稲垣理一郎:Boichi:'
    ],
    resourceType: 'EBOOK',
    originType: 'PURCHASE',
    mangaOrComicAsin: true
  },
  {
    id: 'book-sample-2',
    connector: {id:'', type:'localstrage', path:''},
    asin: 'B07FQG8N2R',
    webReaderUrl: new URL('https://read.amazon.co.jp/kindle-library/manga-wr/B07FQG8N2R'),
    productUrl: new URL('https://m.media-amazon.com/images/I/51Z0+OuWlnL._SY400_.jpg'),
    title: 'Dr.STONE 7 (ジャンプコミックスDIGITAL) (Japanese Edition)',
    percentageRead: 0,
    authors: [
        '稲垣理一郎:Boichi:'
    ],
    resourceType: 'EBOOK',
    originType: 'PURCHASE',
    mangaOrComicAsin: true
  },
]
1