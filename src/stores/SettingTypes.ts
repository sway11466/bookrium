/**
 * 
 */
export type SettingStore = {
  // saved Setting
  settingPath: string,
  storage: Storage,
  // Temporary Setting
  platform: PlatformType,
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
