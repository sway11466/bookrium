/**
 * shell wrapper
 */

import { IpcMainInvokeEvent, shell } from 'electron';

export default {

  openExternal: async (event: IpcMainInvokeEvent, url: string, option: object): Promise<void> => {
    return shell.openExternal(url, option);
  },

}
