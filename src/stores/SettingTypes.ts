/**
 * 
 */
export type SettingStore = {
  settingPath: string,
  storage: Storage,
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

export type PlatformType = 'win32';
