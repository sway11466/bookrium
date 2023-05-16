export interface ConnectApi {
  testKindle: (email: string, password: string) => Promise<boolean>,
  collectKindle: (email: string, password: string) => Promise<unknown[]>,
  testPdfLs: (path: string) => Promise<boolean>,
  collectPdfLs: (path: string) => Promise<unknown[]>,
};
