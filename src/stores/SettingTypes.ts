/**
 * 
 */
export type Setting = {
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
  bookFolderPath: string,
  cacheFolderPath: string,
  artworkFolderPath: string,
};

export type PlatformType = 'win32';
