export interface ConfigApi {
  hasConfig: (path:string) => Promise<boolean>,
  saveConfig: (path:string, key:string, config:object) => Promise<boolean>,
  loadConfig: (path:string, key:string) => Promise<object>,
  hasKey: (path:string, key:string) => Promise<boolean>,
};
