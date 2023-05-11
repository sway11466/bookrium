export interface SettingApi {
  getPlatform: () => Promise<string>,
  getAppVersion: () => string,
};
