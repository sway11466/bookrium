/**
 * Connection settings for setting file.
 */
export type ConnectStore = {
  connectors: Map<string, ConnectType>,
}

export type Connect = {
  id: string
  type: ConnectDivision
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
export type ConnectDivision = 'kindle' | 'pdfls';
export type ConnectType = KindleConnect | PDFLocalStorageConnect;
