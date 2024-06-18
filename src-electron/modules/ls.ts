/**
 * Local Stroage Library
 */

import { app, IpcMainInvokeEvent, dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import { ReaddirSyncOption } from 'src-electron/modules/ls-api';

export default {

  /**
   * Get User App Data Folder Path.
   * 
   * @return user app data folfder path
   * @see https://www.electronjs.org/docs/latest/api/app#appgetpathname
   */
  getUserAppDataFolder: async (): Promise<string> => {
    return app.getPath('appData');
  },

  /**
   * Show Folder Select Dialog.
   * 
   * @return canceled return true if dailog canceled.
   * @return filePaths selected folder paths.
   * @see https://www.electronjs.org/docs/latest/api/dialog
   */
  selectFolder: async (): Promise<Electron.OpenDialogReturnValue> => {
   const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    return { canceled, filePaths }
  },

  /**
   * 
   * @param event 
   * @param path 
   * @param option 
   * @returns 
   */
  readdirSync: async (path: string, option: object) => {
    //Todo: ues option param
    return readdir(path, option);
  },

  /**
   * Save a JSON object to a File.
   * 
   * @param path 
   * @param json
   */
  saveFile: async (event: IpcMainInvokeEvent, path: string, json: object) => {
    fs.writeFileSync(path, JSON.stringify(json));
  },

}

// todo: cause error on electron-main.ts
function readdir(dirPath: string, option: ReaddirSyncOption): string[] {
  //Todo: ues option paramk
  const list = [] as string[];
  for (const item of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (option.type === 'dir' || option.type === 'all') {
      if (item.isDirectory()) {
        list.push(path.join(dirPath, item.name));      
        if (option.recursive) {
          list.push(...readdir(path.join(dirPath, item.name), option));
        }
      }
    }
    if (option.type === 'file' || option.type === 'all') {
      if (item.isFile()) {
        if ((option.filter !== undefined) && !option.filter.test(item.name)) { continue; }
        list.push(path.join(dirPath, item.name));
      }
    }
  }
  return list;
}
