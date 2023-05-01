export interface ConnectApi {
  testKindle: (email: string, password: string) => Promise<boolean>,
  collectKindle: (email: string, password: string) => Promise<unknown[]>,
};
