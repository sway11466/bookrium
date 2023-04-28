/**
 * Local Strage Library
 */

import { app, IpcMainInvokeEvent, dialog } from 'electron';
import fs from 'fs';

export default {

  /**
   * Get User App Data Folder Path.
   * 
   * @return user app data folfder path
   * @see https://www.electronjs.org/docs/latest/api/app#appgetpathname
   */
  getUserAppDataFolder: async() :Promise<string> => {
    return app.getPath('appData');
  },

  /**
   * Show Folder Select Dialog.
   * 
   * @return canceled return true if dailog canceled.
   * @return filePaths selected folder paths.
   * @see https://www.electronjs.org/docs/latest/api/dialog
   */
  selectFolder: async() :Promise<Electron.OpenDialogReturnValue> => {
   const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    return { canceled, filePaths }
  },

  /**
   * Save a JSON object to a File.
   * 
   * @param path 
   * @param json
   */
  saveFile: async (event:IpcMainInvokeEvent, path:string, json:object) => {
    fs.writeFileSync(path, JSON.stringify(json));
  },

}
