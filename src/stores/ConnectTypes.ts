/**
 * Connection settings for setting file.
 */
export type ConnectStore = {
  connectors: Map<string, Connect>,
}

/**
 * Connection settings for setting file.
 */
export type Connect = {
  id: string
  name: string
  lastCollect: Date | null
  type: ConnectType
  bookCount: number
  state: {
    test: ConnectStateTest
    collect: ConnectStateCollect
  }
  extends: KindleExtends | PDFLocalStorageExtends | ImgDirLocalStorageExtends
};
export type ConnectType = 'kindle' | 'pdfls' | 'imgdirls';
export type ConnectStateTest = 'none' | 'testing' | 'ok' | 'error';
export type ConnectStateCollect = 'none' | 'collecting' | 'ok' | 'error';

/**
 * Kindle Connect Setting.
 */
export type KindleExtends = {
  email: string
  password: string
};
export type KindleConnect = Connect & {
  extends: KindleExtends
};

/**
 * PDF LocalStorage Connect Setting.
 */
export type PDFLocalStorageExtends = {
  path: string
};
export type PDFLocalStorageConnect = Connect & {
  extends: PDFLocalStorageExtends
};

/**
 * Image Folder LocalStorage Connect Setting.
 */
export type ImgDirLocalStorageExtends = {
  path: string
};
export type ImgDirLocalStorageConnect = Connect & {
  extends: ImgDirLocalStorageExtends
};
