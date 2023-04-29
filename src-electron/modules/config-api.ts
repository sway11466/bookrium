export interface ConfigApi {
  getPath: () => string,
  hasConfig: () => boolean,
  saveConfig: (config:unknown) => boolean,
  loadConfig: () => unknown,
  hasKey: (key:string) => boolean,
};
