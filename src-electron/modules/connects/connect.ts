/**
 * Contents Library
 */

import { IpcMainInvokeEvent } from 'electron';
import fs from 'fs';
import useStore from 'electron-store';

const store = new useStore({name: 'bookrium-connector-setting'});
const CONNECTOR_SETTING_KEY = 'connectors';

export default {

  hasConnectsSetting: async () :Promise<boolean> => {
    return fs.existsSync(store.path);
  },

  loadConnectsSetting: async () :Promise<object> => {
    return fs.existsSync(store.path) ? store.get(CONNECTOR_SETTING_KEY) as object : {};
  },

  saveConnectsSetting: async (event:IpcMainInvokeEvent, config:object) :Promise<boolean> => {
    store.set(CONNECTOR_SETTING_KEY, config);
    return true;
    // TODO: error handling
  },
}
