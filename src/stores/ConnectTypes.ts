/**
 * Connection settings for setting file.
 */
export type ConnectStore = {
  connectors: Map<string, ConnectTypeDef>,
}

export type Connect = {
  id: string
  type: ConnectType
  bookCount: number
  //Todo: LastCollect: string
};

/**
 * Kindle Connect Setting.
 */
export type KindleConnect = Connect & {
  email: string
  password: string
};

/**
 * LocalStorage Connect Setting.
 */
export type PDFLocalStorageConnect = Connect & {
  path: string
};

/**
 * 
 */
export type ConnectType = 'kindle' | 'pdfls';
export type ConnectTypeDef = KindleConnect | PDFLocalStorageConnect;
