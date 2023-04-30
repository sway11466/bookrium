export interface LocalStorageApi {
  getUserAppDataFolder: () => Promise<string>,
  selectFolder: () => Promise<Electron.OpenDialogReturnValue>,
  saveFile: (path:string, json:object) => Promise<void>,
};
