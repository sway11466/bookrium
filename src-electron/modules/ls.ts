/**
 * Local Strage Library
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
  readdirSync: async (event: IpcMainInvokeEvent, path: string, option: object) => {
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

function readdir(dirPath: string, option: ReaddirSyncOption): string[] {
  //Todo: ues option param
  const list = [] as string[];
  for (const item of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (item.isDirectory()) {
      list.push(...readdir(path.join(dirPath, item.name), option));
    }
    if (item.isFile()) {
      if (option.filter) {
        if (option.filter.test(item.name)) {
          list.push(path.join(dirPath, item.name));
        }
        continue;
      } else {
        list.push(path.join(dirPath, item.name));
      }
    }
  }
  return list;
}
