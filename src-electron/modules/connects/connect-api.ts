import { PDFBook } from "src/stores/BookTypes";
import { PDFLocalStorageConnect } from "src/stores/ConnectTypes";
import { SettingStore } from "src/stores/SettingTypes";

export interface ConnectApi {
  testKindle: (email: string, password: string) => Promise<boolean>,
  collectKindle: (email: string, password: string) => Promise<unknown[]>,
  testPdfLs: (path: string) => Promise<boolean>,
  collectPdfLs: (connector: PDFLocalStorageConnect, setting: SettingStore) => Promise<PDFBook[]>,
};
