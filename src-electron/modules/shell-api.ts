export interface ShellApi {
  openExternal: (url: string, option: object) => Promise<void>,
};
