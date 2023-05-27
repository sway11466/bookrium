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
  state: {
    test: ConnectStateTest
    collect: ConnectStateCollect
  }
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

export type ConnectType = 'kindle' | 'pdfls';
export type ConnectStateTest = 'none' | 'testing' | 'ok' | 'error';
export type ConnectStateCollect = 'none' | 'collecting' | 'ok' | 'error';
export type ConnectTypeDef = KindleConnect | PDFLocalStorageConnect;
