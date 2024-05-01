import { ImgDirBook, PDFBook } from 'src/stores/BookTypes';
import { KindleConnect, PDFLocalStorageConnect, ImgDirLocalStorageConnect } from 'src/stores/ConnectTypes';
import { SettingStore } from 'src/stores/SettingTypes';

export interface ConnectApi {
  testKindle: (email: string, password: string) => Promise<boolean>,
  collectKindle: (connect: KindleConnect) => Promise<unknown[]>,
  testPdfLs: (path: string) => Promise<boolean>,
  collectPdfLs: (connect: PDFLocalStorageConnect, setting: SettingStore) => Promise<PDFBook[]>,
  testImgDirLs: (path: string) => Promise<boolean>,
  collectImgDirLs: (connect: ImgDirLocalStorageConnect, setting: SettingStore) => Promise<ImgDirBook[]>,
};
