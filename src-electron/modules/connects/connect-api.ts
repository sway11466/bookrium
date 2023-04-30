export interface ConnectApi {
  hasConnectsSetting: () => Promise<boolean>,
  loadConnectsSetting: () => Promise<unknown>,
  saveConnectsSetting: (setting:unknown) => Promise<boolean>,
  testKindle: (email: string, password: string) => Promise<boolean>,
  collectKindle: (email: string, password: string) => Promise<unknown[]>,
};
