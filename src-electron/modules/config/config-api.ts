export interface ConfigApi {
  hasConfig: (path:string, key:string) => Promise<boolean>,
  saveConfig: (path:string, key:string, config:object) => Promise<boolean>,
  loadConfig: (path:string, key:string) => Promise<unknown>,
  deleteConfig: (path:string, key:string) => Promise<boolean>,
};
