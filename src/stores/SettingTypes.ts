/**
 * 
 */
export type SettingStore = {
  settingPath: string,
  storage: Storage,
  showapp: ShowApp,
  platform: PlatformType, // update automatically
  version: string,
}

/**
 * 
 */
export type Storage = {
  dataFolderPath: string,
  artworkFolderPath: string,
  bookFolderPath: string,
  cacheFolderPath: string,
  labelFolderPath: string,
};

export type ShowApp = {
  kindle: ShowAppType,
  pdf: ShowAppType,
};

export type PlatformType = 'win32';
export type ShowAppType = 'builtin' | 'os';

export type SettingUpdatable = {
  settingPath: string,
  storage: {
    dataFolderPath: string,
  },
  showapp: {
    kindle: ShowAppType,
    pdf: ShowAppType,
  },
}
