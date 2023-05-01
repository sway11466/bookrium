export type Setting = {
  settingPath: string,
  storage: Storage,
}

export type Storage = {
  dataFolderPath: string,
  bookFolderPath: string,
  cacheFolderPath: string,
  artworkFolderPath: string,
};
