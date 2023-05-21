/**
 * shell wrapper
 */

import { IpcMainInvokeEvent, BrowserWindow, shell } from 'electron';
import log from 'electron-log';

export default {

  openElectron: async (event: IpcMainInvokeEvent, url: string, option: object): Promise<void> => {
    log.info('call openElectron.');
    log.debug(url);
    log.debug(option);
    const window = new BrowserWindow({ width: 800, height: 600 });
    window.setMenuBarVisibility(false);
    window.loadURL(url);
  },

  openExternal: async (event: IpcMainInvokeEvent, url: string, option: object): Promise<void> => {
    log.info('call openExternal.');
    return shell.openExternal(url, option);
  },

}
