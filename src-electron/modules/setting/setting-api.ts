export interface SettingApi {
  getPath: () => string,
  hasConfig: () => boolean,
  saveConfig: (config:unknown) => boolean,
  loadConfig: () => unknown,
  hasKey: (key:string) => boolean,
};
