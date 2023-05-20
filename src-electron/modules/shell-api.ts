export interface ShellApi {
  openElectron: (url: string, option: object) => Promise<void>,
  openExternal: (url: string, option: object) => Promise<void>,
};
