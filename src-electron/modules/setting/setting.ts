/**
 * Config Library
 */

import { IpcMainInvokeEvent } from 'electron';
import fs from 'fs';
import useStore from 'electron-store';

const CONFIG_NAME = 'bookrium';
const store = new useStore({name: 'bookrium-setting'});

export default {

  getPath: async () :Promise<string> => {
    return store.path;
  },

  hasConfig: async () :Promise<boolean> => {
    const path = store.path;
    return fs.existsSync(path);
  },

  saveConfig: async (event:IpcMainInvokeEvent, config:object) :Promise<boolean> => {
    store.set(CONFIG_NAME, config);
    return true;
    // TODO: error handling
  },
  
  loadConfig: async () :Promise<object> => {
    return store.has(CONFIG_NAME) ? store.get(CONFIG_NAME) as object : {};
  },

  hasKey: async (event:IpcMainInvokeEvent, key:string) :Promise<boolean> => {
    return store.has(key);
  },
}
